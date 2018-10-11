const express = require('express');
const config = require('../../config');
const models = require('../models');
const router = express.Router();
const net = require('net');
const checkJwt = require('./../checkJwt');
const _ = require('lodash');
const rdToWgs = require('rdtowgs');


function stringToInt(solution) {
  return solution.map((x) => [parseInt(x.split(' ')[0], 10), parseInt(x.split(' ')[1], 10)]);
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
  const cost = wgs.map((x, i) => calcCrow(x[0], x[1], wgsLatest[i][0], wgsLatest[i][1]));
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
        console.log([req.body.data[0], lastHints]);
        client.write(JSON.stringify([req.body.data[0], lastHints]));
      } else {
        console.log([req.body.data[0]]);
        client.write(JSON.stringify([req.body.data[0]]));
      }
    });


    client.on('data', (data) => {
      const result = {
      };
      try {
        if (JSON.parse(data)) {
          const parsedData = JSON.parse(data);

          result.best = getClairvoyanceResult(stringToInt(parsedData[0]), stringToInt(lastHints));

          result.other = parsedData[1].map((x) => getClairvoyanceResult(stringToInt(x), stringToInt(lastHints)));

          res.send(JSON.stringify(result).toString('utf8'));
        }
      } catch (err) {
        //
      }
    });
  });
});

module.exports = router;
