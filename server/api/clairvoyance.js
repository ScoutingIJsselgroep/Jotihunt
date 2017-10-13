const express = require('express');
const config = require('../../config');
const models = require('../models');
const router = express.Router();
const net = require('net');
const checkJwt = require('./../checkJwt');
const _ = require('lodash');

router.post('/', checkJwt, (req, res) => {
  // Get last hint data
  models.Hint.findAll({
    include: [{
      model: models.HintType,
    }, models.User, models.Subarea],
  }).then((hints) => {
    const groupedHints = _.groupBy(hints, 'Subarea.name');

    const groupedHintsList = [];

    const sort = _.keys(groupedHints).sort();

    for (let i in sort) {
      groupedHintsList.push(groupedHints[sort[i]]);
    }

    const sortedHints = _.map(groupedHintsList, (groupedHint) => _.sortBy(groupedHint, ['createdAt']));

    const lastHints = _.map(sortedHints, (sortedHint) => `${_.last(sortedHint).rdy} ${_.last(sortedHint).rdx}`);

    const client = new net.Socket();
    client.connect(config.clairvoyance.port, config.clairvoyance.ip, () => {
      if (lastHints.length === 6) {
        console.log([req.body.data[0], lastHints]);
        client.write(JSON.stringify([req.body.data[0], lastHints]));
      } else {
        console.log([req.body.data[0]]);
        client.write(JSON.stringify([req.body.data[0]]));
      }
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
});

module.exports = router;
