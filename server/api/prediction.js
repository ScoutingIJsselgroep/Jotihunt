const express = require('express');
const router = express.Router();
const _ = require('lodash');
const request = require("request");
const checkJwt = require('./../checkJwt');
const config = require('./../../config');
const models = require('../models');
const net = require('net');
const cache = require('apicache').middleware;

function getLastHints(callback) {
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

    const lastHints = _.map(sortedHints, (sortedHint) => _.last(sortedHint));

    callback(lastHints);
  });
}

/**
  Perform a call to Projection, a location prediction API.
*/
router.get('/', cache('3 minute'), (req, res) => {
  getLastHints((lastHints) => {
    // Prepare object array for Projection API.
    const requestBody = {
      lastLocations: _.map(lastHints, (hint) => {
        return {
          subarea: hint.Subarea.name.toLowerCase(),
          location: [hint.latitude, hint.longitude],
          timestamp: hint.createdAt
        };
      })
    }

    try {
      console.log(JSON.stringify(requestBody));
      // Perform request to Projection API over a socket.
      const client = new net.Socket();
      client.connect(31337, '142.93.137.62', () => {
        console.log("[+] Requesting Projection API");
        client.write(JSON.stringify(requestBody));
      });

      // Receive data
      let data = '';
      client.on('data', (chunk) => {
        data += chunk;
      });

      // Send data to client on response end.
      client.on('end', () => {
        try {
          const parsedData = JSON.parse(data);
          // Send data to client
          res.send(JSON.stringify(parsedData));
        } catch (error) {
          console.error("[-] Error on retrieving Projection API")
          console.error(error);
          res.status(500).send(error);
        }
      });

      client.on('error', (error) => {
        res.status(500).send(error);
      });
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  });
});

module.exports = router;
