const express = require('express');
const models = require('../models');
const geocoder = require('geocoder');
const config = require('./../../config');
const router = express.Router();
const rdToWgs = require('rdtowgs');

geocoder.selectProvider('google', { appid: config.google.googleAppId });

router.get('/', (req, res) => {
  models.Hint.findAll({
    include: [models.HintType, models.User, models.Subarea],
  }).then((hints) => {
    res.send(hints);
  });
});

/**
 * Given an RD-coordinate, calculate WSG-84, subarea and retrieve the street address.
 */
router.post('/information', (req, res) => {
  // Convert RD-coordinate to WSG-84
  const wgs = rdToWgs(req.body.longitude, req.body.latitude);
  const subarea = getSubarea(wgs);
  geocoder.reverseGeocode(wgs[0], wgs[1], (err, data) => {
    res.send({
      wgs,
      subarea,
      address: data,
    });
  });
});

function getSubarea(wgs) {
  return 'Alpha';
}

router.get('/:type', (req, res) => {
  models.Hint.findAll({
    include: [{
      model: models.HintType,
      where: {
        name: req.params.type,
      },
    }, models.User, models.Subarea],
  }).then((hints) => {
    res.send(hints);
  });
});

router.get('/delete/:hintId', (req, res) => {
  models.Hint.destroy({
    where: {
      id: req.params.hintId,
    },
  }).then(() => {
    res.send({ message: 'success' });
  });
});

router.post('/', (req, res) =>
  res.send(200)
);

module.exports = router;
