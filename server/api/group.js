const express = require('express');
const _ = require('lodash');
const tj = require('@mapbox/togeojson');
const fs = require('fs');
const path = require('path');
const models = require('../models');
const router = express.Router();
const request = require('request');
const checkJwt = require('./../checkJwt');
const kmlMapName = require('../../config').map.filename;
const DOMParser = require('xmldom').DOMParser;
const { inSubarea } = require('../../helpers/geometry');
const config = require('./../../config');
const geocoder = require('google-geocoder')({ key: config.google.googleServerAuthToken });
// const kml = require(`../../maps/${kmlMapName}`);

router.get('/', (req, res) => {
  models.Group.findAll({
    include: [models.Subarea],
  }).then((groups) => {
    const sortedGroups =  _.orderBy(groups, ['town'], ['asc']);
    res.send(sortedGroups);
  });
});

/**
 * Increment visits
 */
router.post('/visits', (req, res) => {
  models.Group.increment('visits', {
    by: req.body.count,
    where: {
      name: req.body.name
    }
  }).then(() => {
    res.send({});
  });
});

/**
 * Returns a distance matrix between different groups.
 * DOESN'T WORK FOR > 10 groups per subarea.
 */
router.get('/matrix', (req, res) => {
  models.Group.findAll({
    include: [models.Subarea],
  }).then((groups) => {
    // Group groups per subarea
    const groupedGroups = _.groupBy(groups, 'Subarea.name');

    const distanceMatrix = _.mapValues(groupedGroups, function(groups) {
      const groupLocations = _.map(groups, (group) => {
        return {lat: group.latitude, lng: group.longitude};
      });
      console.log(groupLocations);
      googleMapsClient.distanceMatrix({
        origins: groupLocations,
        destinations: groupLocations
      }, (err, response) => {
        return response;
      });
    });

    res.send(distanceMatrix);
  });
});

function fillDatabaseWithGroups(res) {
  // If database is empty, then continue rest.
  request('https://jotihunt.net/api/1.0/deelnemers', (error, response, body) => {
    if (error) {
      res.status(500).send(error);
    } else {
      const groups = JSON.parse(body).data;
      _.map(groups, (group) => {
        models.Group.create({
          name: group.teamnaam,
          town: group.plaats,
          location: `${group.straat} ${group.huisnummer} <br /> ${group.postcode} ${group.plaats}`,
          latitude: group.lat,
          longitude: group.long,
          visits: 0,
          SubareaId: null,
        });
      });
    }
  });
}

router.post('/increment', (req, res) => {
  models.Group.increment({
    visits: req.body.value,
  }, {
    where: {
      id: req.body.groupId,
    }
  }).then(() => {
    models.Group.findAll({
      include: [models.Subarea],
    }).then((groups) => {
      const sortedGroups =  _.orderBy(groups, ['town'], ['asc']);
      res.send(sortedGroups);
    });
  });
});

router.get('/fill', (req, res) => {
  // Check if database is empty.
  models.Group.findAll({
    include: [models.Subarea],
  }).then((groups) => {
    if (groups && groups.length > 0) {
      // Database is filled, send a message the database has to be filled first.
      res.send("Database moet eerst leeg zijn om gevuld te kunnen worden.");
    } else {
      // Database is empty, fill with data.
      fillDatabaseWithGroups(res);
    }
  });

});

module.exports = router;
