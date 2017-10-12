const express = require('express');
const models = require('../models');
const router = express.Router();
const checkJwt = require('./../checkJwt');

router.get('/', checkJwt, (req, res) => {
  models.Car.findAll({}).then((cars) => {
    res.send(cars);
  });
});


router.post('/', (req, res) => {
  models.Car.findOne({
    where: {
      name: req.body.name,
    },
  }).then((result) => {
    if (result) { // update
      return result.update({
        latitude: req.body.latitude,
        longitude: req.body.longitude,
      });
    }
    return models.Car.create({
      name: req.body.name,
      latitude: req.body.latitude,
      longitude: req.body.longitude,
    });
  });
  res.send(200);
});

module.exports = router;
