const express = require('express');
const _ = require('lodash');
const models = require('../models');
const router = express.Router();
const request = require('request');
const checkJwt = require('./../checkJwt');

router.get('/', (req, res) => {
  models.Group.findAll({
    include: [models.Subarea],
  }).then((groups) => {
    const sortedGroups = _.orderBy(groups, ['city'], ['asc']);
    res.send(sortedGroups);
  });
});

/**
 * Increment visits
 */
router.post('/visits', checkJwt, (req, res) => {
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
 * Set
 */
router.post('/subarea', checkJwt, (req, res) => {
  models.Group.update({
    SubareaId: req.body.subareaId === 6 ? null : req.body.subareaId
  }, {
    where: {
      id: req.body.groupId
    }
  }).then((err, response) => {
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

    const distanceMatrix = _.mapValues(groupedGroups, function (groups) {
      const groupLocations = _.map(groups, (group) => {
        return {
          lat: group.latitude,
          lng: group.longitude
        };
      });
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

router.post('/increment', checkJwt, (req, res) => {
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
      const sortedGroups = _.orderBy(groups, ['city'], ['asc']);
      res.send(sortedGroups);
    });
  });
});

module.exports = router;