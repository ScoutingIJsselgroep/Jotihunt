const express = require('express');
const router = express.Router();
const checkJwt = require('./../checkJwt');

const models = require('../models');

/**
 * Return all messages
 */
router.get('/', checkJwt, (req, res) => {
  models.Api.findAll({
    include: [{
      model: models.ApiType,
    }],
    order: [
      ['createdAt', 'DESC']
    ],
  }).then((hints) => {
    res.send(hints);
  });
});

module.exports = router;