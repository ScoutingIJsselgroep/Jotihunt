const express = require('express');
const models = require('../models');
const router = express.Router();
const checkJwt = require('./../checkJwt');

router.get('/', checkJwt, (req, res) => {
  models.Group.findAll({
    include: [models.Subarea],
  }).then((groups) => {
    res.send(groups);
  });
});

module.exports = router;
