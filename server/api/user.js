const express = require('express');
const models = require('../models');
const router = express.Router();

const checkJwt = require('./../checkJwt');

router.get('/', checkJwt, (req, res) => {
  models.User.findAll({
    include: [],
  }).then((users) => {
    res.send(users);
  });
});

module.exports = router;
