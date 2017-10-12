
const express = require('express');
const router = express.Router();
const checkJwt = require('./../checkJwt');


router.get('/', checkJwt, (req, res) => {
  res.send('Hi!');
});

module.exports = router;
