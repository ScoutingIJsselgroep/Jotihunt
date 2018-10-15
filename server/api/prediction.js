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

/*
function getNextLocation(callback) {
  models.Group.findAll({
    include: [models.Subarea],
  }).then((groups) => {
    // Group by subarea
    const groupedGroups = _.groupBy(groups, 'Subarea.name');

    // Group by number of visits
    for (let key in groupedGroups) {
      groupedGroups[key] = _.groupBy(groupedGroups[key], 'visits');
    }

    // Loop every subarea
    _.map(groupedGroups, (subareaGroups) => { // Loops 6 times
      // Loop every groups with same visits
      _.map(subareaGroups, (sameVisitsGroups) => {
        // Generate shortest path between groups that have the same amount
        // of visits

        // Setup Google Direction Services
        const googleMapsClient = require('@google/maps').createClient({
          key: config.google.googleAppId,
        });


        // Loop sameVisitsGroups as destinations
        _.map(sameVisitsGroups, (destinationGroup) => {

          // Set other groups with same number of visits but destinationGroup as waypoints
          const waypoints = _.map(_.reject(sameVisitsGroups, destinationGroup), (group) => [group.latitude, group.longitude]);
          console.log(waypoints);
          // Get shortest from groups to destination
          googleMapsClient.directions({
            origin: [52.2, 6.2],
            destination: [destinationGroup.latitude, destinationGroup.longitude],
            waypoints: waypoints, // Everything but destinationGroup
            optimize: true,
            mode: "walking",
          }, (err, response) => {
            console.log("ROUTEEEE==============");
            console.log(response.json.routes[0]);
          });
        });


        // Return groups as waypoints and add every group (but last) to next visit category
      });
    });

    // console.log(groupedGroups);
  });
}*/

// TODO: Add caching function
/**
  Perform a call to Projection, a location prediction API.
*/
router.get('/', cache('1 minute'), (req, res) => {
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
      // Perform request to Projection API over a socket.
      const client = new net.Socket();
      client.connect(31337, '142.93.137.62', () => {
        console.log("Requesting Server");
        client.write(JSON.stringify(requestBody));
      });

      // Receive data
      let data = '';
      client.on('data', (chunk) => {
        data += chunk;
      });

      // Send data to client on response end.
      client.on('end', () => {
        const parsedData = JSON.parse(data);
        // TODO: Remove log file
        console.log(parsedData);
        // Send data to client
        res.send(JSON.stringify(parsedData));
      });
    } catch (error) {
      res.status(500).send(error);
    }
  });
});

module.exports = router;
