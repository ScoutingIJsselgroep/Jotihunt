const _ = require('lodash');

const {
  inSubarea,
  getPolygons
} = require('../../helpers/geometry');
const {
  sendHint,
  sendHunt,
  sendSimpleLocation
} = require('../telegram/index');

const cache = require('apicache').middleware;
const express = require('express');
const models = require('../models');
const config = require('./../../config');
const router = express.Router();
const request = require('request');
const rdToWgs = require('rdtowgs');
const wgstoord = require('./../wgstord');
const {
  REFRESH_HINTS
} = require('../socket_actions');
const checkJwt = require('./../checkJwt');
const geocoder = require('google-geocoder')({
  key: config.google.googleServerAuthToken
});


router.get('/api', cache('1 minute'), (req, res) => {
  request('https://jotihunt.net/api/1.0/hint', (error, response, body) => {
    if (error) {
      res.status(500).send(error);
    } else {
      res.send(JSON.parse(body));
    }
  });
});

router.get('/', checkJwt, (req, res) => {
  models.Hint.findAll({
    include: [models.HintType, models.User, models.Subarea],
    order: [
      ['updatedAt', 'DESC'],
    ],
  }).then((hints) => {
    res.send(hints);
  });
});

/**
 * Given an WGS-coordinate, subarea and retrieve the street address.
 */
router.post('/location', checkJwt, (req, res) => {
  if (req.body.latlng) {
    const rd = null;
    const subarea = inSubarea(req.body.latlng);
    geocoder.reverseFind(req.body.latlng[0], req.body.latlng[1], (err, data) => {
      res.send({
        rd,
        subarea,
        address: data,
        key: config.google.googleServerAuthToken,
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
  geocoder.reverseFind(wgs[0], wgs[1], (err, data) => {
    if (err) {
      res.status(500).send(err);
      return;
    }
    res.send({
      wgs,
      address: data,
    });
  });
});

router.get('/centers', (req, res) => {
  const polygons = getPolygons();

  polygons.map((polygon) => {
    models.Subarea.findAll({
      where: {
        name: polygon.name
      }
    }).then((subareas) => {
      subareas.map((subarea) => {
        subarea.lonCenter = polygon.center[0]
        subarea.latCenter = polygon.center[1]
        subarea.save();
      });
    });
  });
  res.send("Polygons updated");
});

/**
 * Save Clairvoyance Hints to database and send a Telegram-chat.
 */
router.post('/clairvoyance', checkJwt, (req, res) => {
  if (req.body.data) {
    req.body.data.map((entry) => {
      if (!_.includes(entry, 'X')) {
        const hint = entry;
        const wgs = rdToWgs(hint[0], hint[1]);
        const hintSubarea = inSubarea(wgs);
        geocoder.reverseFind(wgs[0], wgs[1], (err, data) => {
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
          }).then(() => {
            req.io.sockets.emit(REFRESH_HINTS);
          });
        });
      }
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
      const rd = wgstoord(req.body.latitude, req.body.longitude);


      if (req.body.hintTypeId) {
        // Create a hunt/information point on map
        models.Hint.create({
          latitude: req.body.latitude,
          longitude: req.body.longitude,
          rdx: req.body.rdx || rd[1],
          rdy: req.body.rdy || rd[0],
          address: req.body.address,
          SubareaId: subarea.id,
          createdAt: req.body.createdAt ? req.body.createdAt : new Date(),
          updatedAt: req.body.updatedAt ? req.body.updatedAt : new Date(),
          HintTypeId: req.body.hintTypeId ? req.body.hintTypeId : 1,
          UserId: 1,
        });
        if (req.body.hintTypeId === 2) {
          sendHunt(req.body.subarea, req.body.latitude, req.body.longitude, req.body.address, req.body.createdAt);
        } else {
          sendSimpleLocation(req.body.subarea, req.body.latitude, req.body.longitude, req.body.address);
        }
      } else {
        // Create a hint
        var date = new Date();
        date.setMinutes(0);
        date.setSeconds(0);

        models.Hint.create({
          latitude: req.body.latitude,
          longitude: req.body.longitude,
          rdx: req.body.rdx || rd[1],
          rdy: req.body.rdy || rd[0],
          createdAt: date,
          updatedAt: date,
          address: req.body.address,
          SubareaId: subarea.id,
          HintTypeId: req.body.hintTypeId ? req.body.hintTypeId : 1,
          UserId: 1,
        });
        sendHint(req.body.subarea, req.body.latitude, req.body.longitude, req.body.address);
      }
      req.io.sockets.emit(REFRESH_HINTS);
      res.send({
        message: 'success'
      });
    });
  });
});

/**
 * Get last hint
 */
router.get('/latest', (req, res) => {
  models.Api.findOne({
    include: [{
      model: models.ApiType,
      where: {
        name: "Hint"
      }
    }],
    order: [
      ['createdAt', 'DESC']
    ],
  }).then((hints) => {
    res.send(hints);
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
    res.send({
      message: 'success'
    });
  });
});

module.exports = router;