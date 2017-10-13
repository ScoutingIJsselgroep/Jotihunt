
const { inSubarea } = require('../../helpers/geometry');
const { sendHint, sendHunt, sendSimpleLocation } = require('../telegram/index');

const express = require('express');
const models = require('../models');
const geocoder = require('geocoder');
const config = require('./../../config');
const router = express.Router();
const rdToWgs = require('rdtowgs');

geocoder.selectProvider('google', { appid: config.google.googleAppId });
const checkJwt = require('./../checkJwt');


router.get('/', checkJwt, (req, res) => {
  models.Hint.findAll({
    include: [models.HintType, models.User, models.Subarea],
  }).then((hints) => {
    res.send(hints);
  });
});

/**
 * Given an WGS-coordinate, calculate RD, subarea and retrieve the street address.
 */
router.post('/location', checkJwt, (req, res) => {
  if (req.body.latlng) {
    const rd = null;
    const subarea = inSubarea(req.body.latlng);
    geocoder.reverseGeocode(req.body.latlng[0], req.body.latlng[1], (err, data) => {
      res.send({
        rd,
        subarea,
        address: data,
      });
    });
  } else {
    res.sendStatus(400);
  }
});

/**
 * Given an RD-coordinate, calculate WSG-84, subarea and retrieve the street address.
 */
router.post('/information', checkJwt, (req, res) => {
  // Convert RD-coordinate to WSG-84
  const wgs = rdToWgs(req.body.longitude, req.body.latitude);
  const subarea = inSubarea(wgs);
  geocoder.reverseGeocode(wgs[0], wgs[1], (err, data) => {
    res.send({
      wgs,
      subarea,
      address: data,
    });
  });
});

/**
 * Save Clairvoyance Hints to database and send a Telegram-chat.
 */
router.post('/clairvoyance', checkJwt, (req, res) => {
  if (req.body.data) {
    req.body.data.map((entry) => {
      const hint = entry.split(' ');
      const wgs = rdToWgs(hint[0], hint[1]);
      const hintSubarea = inSubarea(wgs);
      geocoder.reverseGeocode(wgs[0], wgs[1], (err, data) => {
        models.Subarea.findAll({
          where: {
            name: hintSubarea,
          },
        }).then((subareas) => {
          subareas.map((subarea) => {
            models.Hint.create({
              latitude: wgs[0],
              longitude: wgs[1],
              rdx: hint[1],
              rdy: hint[0],
              address: data.results[0] ? data.results[0].formatted_address : null,
              SubareaId: subarea.id,
              HintTypeId: 1,
              UserId: 1,
            });
            sendHint(hintSubarea, wgs[0], wgs[1], data.results[0] ? data.results[0].formatted_address : null);
            return null;
          });
        });
      });
      return null;
    });
  }
  res.send({});
});

/**
 * Save hint to the database and send a Telegram-chat.
 */
router.post('/', checkJwt, (req, res) => {
  models.Subarea.findAll({
    where: {
      name: req.body.subarea,
    },
  }).then((subareas) => {
    subareas.map((subarea) => {
      models.Hint.create({
        latitude: req.body.latitude,
        longitude: req.body.longitude,
        rdx: req.body.rdx,
        rdy: req.body.rdy,
        address: req.body.address,
        SubareaId: subarea.id,
        HintTypeId: req.body.hintTypeId ? req.body.hintTypeId : 1,
        UserId: 1,
      });
      if (req.body.hintTypeId) {
        if (req.body.hintTypeId === 2) {
          sendHunt(req.body.subarea, req.body.latitude, req.body.longitude, req.body.address);
        } else {
          sendSimpleLocation(req.body.subarea, req.body.latitude, req.body.longitude, req.body.address);
        }
      } else {
        sendHint(req.body.subarea, req.body.latitude, req.body.longitude, req.body.address);
      }
      res.send({ message: 'success' });
    });
  });
});

router.get('/:type', checkJwt, (req, res) => {
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

router.get('/delete/:hintId', checkJwt, (req, res) => {
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
