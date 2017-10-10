
const { inSubarea } = require('../../helpers/geometry');
const { sendHint } = require('../telegram/index');

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
 * Save hint to the database and send a Telegram-chat.
 */
router.post('/', (req, res) => {
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
        HintTypeId: 1,
        UserId: 1,
      });
      sendHint(req.body.subarea, req.body.latitude, req.body.longitude, req.body.address);
    });
  });
});

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
