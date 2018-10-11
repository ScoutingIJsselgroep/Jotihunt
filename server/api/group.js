const express = require('express');
const _ = require('lodash');
const tj = require('@mapbox/togeojson');
const fs = require('fs');
const path = require('path');
const models = require('../models');
const router = express.Router();
const checkJwt = require('./../checkJwt');
const kmlMapName = require('../../config').map.filename;
const DOMParser = require('xmldom').DOMParser;
const { inSubarea } = require('../../helpers/geometry');
const config = require('./../../config');
const geocoder = require('google-geocoder')({ key: config.google.googleAppId });
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
  // Read KML file with groups.
  fs.readFile(path.join(__dirname, `../../maps/${kmlMapName}`), {encoding: 'utf-8'}, function(err,data){
    if (!err) {
      // Parse KML to json.
      const kml = new DOMParser().parseFromString(data);
      const geoJson = tj.kml(kml, { styles: true });
      const result = _.map(geoJson.features, (feature, i) => {
        // All points that are not "Jotihunt Organisations" are groups.
        if (feature.geometry.type === 'Point') {
          if (feature.properties.name !== "Jotihunt Organisatie") {
            // Get group subarea
            const subareaName = inSubarea([feature.geometry.coordinates[1], feature.geometry.coordinates[0]]);

            // Get group address
            setTimeout(() =>
            geocoder.reverseFind(feature.geometry.coordinates[1], feature.geometry.coordinates[0], (err, data) => {
              models.Subarea.findAll({
                where: {
                  name: subareaName,
                },
              }).then((subareas) => {
                subareas.map((subarea) => {
                  // Insert groep into the database
                  models.Group.create({
                    name: feature.properties.name,
                    town: data[0] ? data[0].locality.long_name : null,
                    location: data[0] ? data[0].formatted_address : null,
                    latitude: feature.geometry.coordinates[1],
                    longitude: feature.geometry.coordinates[0],
                    visits: 0,
                    SubareaId: subarea.id,
                  });
                });
              });
            });
          }
        }
      });
      res.send("Operatie geslaagd");
    } else {
        console.log(err);
    }
  });
}

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
