const express = require('express');
const models = require('../models');
const router = express.Router();
const checkJwt = require('./../checkJwt');
const ManagementClient = require('auth0').ManagementClient;
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
      speed: req.body.speed * 3.6, // m/s to km/h conversion
      latitude: req.body.latitude,
      longitude: req.body.longitude,
    });
    // TODO: Make update to Socket to do a live website update

    if (result) { // update
      return result.update({
        speed: req.body.speed * 3.6, // m/s to km/h conversion
        latitude: req.body.latitude,
        longitude: req.body.longitude,
      });
    }
    return models.Car.create({
      name: req.body.name,
      speed: req.body.speed * 3.6, // m/s to km/h conversion
      latitude: req.body.latitude,
      longitude: req.body.longitude,
    });
  });
  res.send(200);
});


router.post('/weblocation', checkJwt, (req, res) => {
  const auth0 = new ManagementClient({
    domain: 'jotihunt-js.eu.auth0.com',
    clientId: 'pdEXKBoOxnCmwpXSF5Db19dQC4hlgyXH',
    clientSecret: 'ub0kk_xG-hQ6vroiC5__EKIoeN2Suglvq0zpkRfnaucKBGJJS0HeUF4QWTDNeQnT',
    scope: 'read:users read:user_idp_tokens'
  });

  auth0.getUser({
    id: req.user.sub
  }, function (err, auth0user) {
    models.Car.findOne({
      where: {
        name: auth0user.name,
      },
    }).then((result) => {
      models.CarHistory.create({
        name: auth0user.name,
        speed: req.body.speed * 3.6, // m/s to km/h conversion
        latitude: req.body.latitude,
        longitude: req.body.longitude,
      });

      res.send({});
      if (result) { // update
        return result.update({
          speed: req.body.speed * 3.6, // m/s to km/h conversion
          latitude: req.body.latitude,
          longitude: req.body.longitude,
        });
      }
      return models.Car.create({
        name: auth0user.name,
        speed: req.body.speed * 3.6, // m/s to km/h conversion
        latitude: req.body.latitude,
        longitude: req.body.longitude,
      });
    });
  });
});

module.exports = router;