const express = require('express');
const models = require('../models');
const router = express.Router();
const checkJwt = require('./../checkJwt');

router.get('/', checkJwt, (req, res) => {
  models.SubareaStatus.findAll({
    include: [models.Subarea, models.Status],
  }).then((subareastatus) => {
    res.send(subareastatus);
  });
});

router.get('/latest/', checkJwt, (req, res) => {
  const callback = (result) => {
    res.send(result);
  };
  models.SubareaStatus.getLatest(callback);
});

module.exports = router;
