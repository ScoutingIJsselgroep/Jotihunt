const express = require('express');
const models = require('../models');
const router = express.Router();
const checkJwt = require('./../checkJwt');
const openSocket = require('socket.io-client');

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
    models.CarHistory.create({
      name: req.body.name,
      latitude: req.body.latitude,
      longitude: req.body.longitude,
    });
    // Make update to Socket to do a live website update
    const socket = openSocket('http://localhost:3000');
    socket.emit('status');

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


router.post('/weblocation', checkJwt, (req, res) => {
  models.Car.findOne({
    where: {
      name: req.user.sub,
    },
  }).then((result) => {
    models.CarHistory.create({
      name: req.user.sub,
      latitude: req.body.latitude,
      longitude: req.body.longitude,
    });
    // Make update to Socket to do a live website update
    const socket = openSocket('http://localhost:3000');
    socket.emit('status');

    if (result) { // update
      return result.update({
        latitude: req.body.latitude,
        longitude: req.body.longitude,
      });
    }
    return models.Car.create({
      name: req.user.sub,
      latitude: req.body.latitude,
      longitude: req.body.longitude,
    });
  });
  res.send({});
});

module.exports = router;
