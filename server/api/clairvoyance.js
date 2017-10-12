const express = require('express');
const config = require('../../config');
const models = require('../models');
const router = express.Router();
const net = require('net');
const checkJwt = require('./../checkJwt');

router.post('/', checkJwt, (req, res) => {
  const client = new net.Socket();
  client.connect(config.clairvoyance.port, config.clairvoyance.ip, () => {
    client.write(JSON.stringify(req.body.data));
  });


  client.on('data', (data) => {
    try {
      if (JSON.parse(data)) {
        res.send(data.toString('utf8'));
      }
    } catch (err) {
      //
    }
  });
});

module.exports = router;
