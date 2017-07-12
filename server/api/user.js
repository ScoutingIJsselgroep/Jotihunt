const express = require('express');
const models = require('../models');
const router = express.Router();

router.get('/', (req, res) => {
  models.User.findAll({
    include: [],
  }).then((users) => {
    res.send(users);
  });
});

module.exports = router;
