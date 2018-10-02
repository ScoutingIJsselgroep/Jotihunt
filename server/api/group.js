const express = require('express');
const _ = require('lodash');
const models = require('../models');
const router = express.Router();
const checkJwt = require('./../checkJwt');

router.get('/', (req, res) => {
  models.Group.findAll({
    include: [models.Subarea],
  }).then((groups) => {
    const sortedGroups =  _.orderBy(groups, ['town'], ['asc']);
    res.send(sortedGroups);
  });
});

module.exports = router;
