
const express = require('express');
const router = express.Router();
const _ = require('lodash');

const checkJwt = require('./../checkJwt');
const config = require('./../../config');
const models = require('../models');

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
}

router.get('/', (req, res) => {
  // Get a list of latest hints
  getLastHints((lastHints) => {
    getNextLocation((nextLocations) => {

    });
  });

});

module.exports = router;
