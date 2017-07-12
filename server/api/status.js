const express = require('express');
const models = require('../models');
const router = express.Router();

router.get('/', (req, res) => {
  models.SubareaStatus.findAll({
    include: [models.Subarea, models.Status],
  }).then((subareastatus) => {
    res.send(subareastatus);
  });
});

router.get('/latest/', (req, res) => {
  const callback = (result) => {
    res.send(result);
  };
  models.SubareaStatus.getLatest(callback);
});

module.exports = router;
