const express = require('express');
const router = express.Router();
const checkJwt = require('./../checkJwt');
const {
    sendMessage
} = require('../telegram/index');

/**
 * Send a message
 */
router.get('/', (req, res) => {
    sendMessage('Nieuws', req.query.message);
});

module.exports = router;