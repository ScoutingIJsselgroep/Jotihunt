const express = require('express');
const config = require('../../config');
const models = require('../models');
const router = express.Router();
const net = require('net');
const cache = require('apicache').middleware;
const checkJwt = require('./../checkJwt');
const _ = require('lodash');
const rdToWgs = require('rdtowgs');
const request = require('request');
const md5 = require('md5');

function stringToInt(solution) {
  return solution.map((x) => [parseInt(x.split(" ")[0], 10), parseInt(x.split(" ")[1], 10)]);
}

function rdSolutionToWgs(solution) {
  return solution.map((x) => rdToWgs(x[0], x[1]));
}

function calcCrow(lat1, lon1, lat2, lon2) {
  const R = 6371; // km
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const latconst1 = toRad(lat1);
  const latconst2 = toRad(lat2);

  const a = (Math.sin(dLat / 2) * Math.sin(dLat / 2)) + (Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(latconst1) * Math.cos(latconst2));
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;
  return distance;
}

function toRad(value) {
  return (value * Math.PI) / 180;
}

function getClairvoyanceResult(rd, latestSolution) {
  // Convert new solution to wgs coordinates
  const wgs = rdSolutionToWgs(rd);
  const wgsLatest = rdSolutionToWgs(latestSolution);

  // Calculate euclidean distances
  const cost = wgs.map((x, i) => {
    if (wgsLatest[i] == undefined) {
      return 1337;
    }
    return calcCrow(x[0], x[1], wgsLatest[i][0], wgsLatest[i][1]);
  });
  const totalCost = _.sum(cost);

  return {
    wgs,
    rd,
    cost,
    totalCost,
  };
}

router.post('/', checkJwt, (req, res) => {
  // Get last hint data
  models.Hint.findAll({
    include: [{
      model: models.HintType,
    }, models.User, models.Subarea],
  }).then((hints) => {
    const groupedHints = _.groupBy(hints, 'Subarea.name');

    const groupedHintsList = [];

    const sort = _.keys(groupedHints).sort();

    for (const i in sort) {
      groupedHintsList.push(groupedHints[sort[i]]);
    }

    const sortedHints = _.map(groupedHintsList, (groupedHint) => _.sortBy(groupedHint, ['createdAt']));

    const lastHints = _.map(sortedHints, (sortedHint) => `${_.last(sortedHint).rdy} ${_.last(sortedHint).rdx}`);

    const client = new net.Socket();
    client.connect(config.clairvoyance.port, config.clairvoyance.ip, () => {
      if (lastHints.length === 6) {
        client.write(JSON.stringify([req.body.data[0], lastHints]));
      } else {
        client.write(JSON.stringify([req.body.data[0]]));
      }
    });

    let allData = '';

    client.on('data', (data) => {
      allData += data;
    });

    client.on('end', () => {
      const result = {};
      try {
        if (JSON.parse(allData)) {
          const parsedData = JSON.parse(allData);

          result.best = getClairvoyanceResult(stringToInt(parsedData[0]), stringToInt(lastHints));

          result.other = parsedData[1].map((x) => getClairvoyanceResult(stringToInt(x), stringToInt(lastHints)));

          res.send(JSON.stringify(result).toString('utf8'));
        }
      } catch (error) {
        console.error(error);
      }
    });

    client.on('error', (error) => {
      res.status(500).send(JSON.stringify(error).toString('utf8'))
    })
  });
});

/**
  Returns the MD5 sum of an url
  Cached for 10 minutes.
  @param query.url The url to get the MD5 sum from.
*/
router.get('/md5', cache('10 minutes'), (req, res) => {
  req.apicacheGroup = req.query.url;

  request(req.query.url, (error, response, body) => {
    res.send(md5(body));
  });
});

/**
 * Initializes Clairvoyance with latest known hint
 */
router.get('/init', cache('20 seconds'), (req, res) => {
  // Make a request to the cached api.
  request('http://localhost:3000/api/hint/api', async function (error, response, body) {
    // Parse response to JSON
    const data = JSON.parse(body).data;

    // Get latest hint
    const hint = data[0];

    // Loop subareas check the hint. A subarea may not be present in the object, so we check for existence.
    // The loop eventually turns back the MD5 sum of every image retrieved
    const result = await Promise.all(_.map(config.dbMappings.nArea, async function (subarea) {
      // Check if hint has key `subarea`
      if (subarea in hint) {
        const pictures = hint[subarea];

        // Loop every image in the picture list.
        const md5s = await Promise.all(_.map(pictures, async function (picture) {
          return new Promise(resolve =>
            // Make a request to retrieve MD5 sum
            request('http://localhost:3000/api/clairvoyance/md5?url=http:' + picture, async function (error, response, body) {
              if (!error)
                resolve(body);
            }));
        }));
        return md5s;
      } else {
        // Return null if subarea isn't set.
        return null;
      }

    }));
    // List that determines whether the letter already has been used.
    const contains = []

    // List of letters that may be used.
    const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K'];

    // Loop over subareas
    const initState = _.map(result, (subarea) => {

      // Loop over md5 sums of each subarea
      let subareaState = _.map(subarea, (md5) => {
        // Define new letter for this md5sum if it doesn't exist.
        if (!contains.includes(md5)) {
          contains.push(md5);
        }
        // Get the letter that correcponds to this md5sum
        return letters[contains.indexOf(md5)];
      }).join("");

      // If no letters are set, then set X as letters
      if (subareaState == "") {
        subareaState = "XXXXXXXXXX";
      }

      // Add a space in the middle of the joined letterkey
      return subareaState.substr(0, 5) + " " + subareaState.substr(5);
    });

    // Send result to the client
    res.send(initState);
  });
});


module.exports = router;