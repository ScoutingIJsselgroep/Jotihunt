/* eslint-disable */

const fs = require('fs')
const path = require('path');
const basename = path.basename(__filename);

const timeout = require('./../../config').poller.timeout;

//load all routes in dir
module.exports = function () {
  const io = require('socket.io')(server);

  fs
    .readdirSync(__dirname)
    .filter(function (file) {
      return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
    })
    .forEach(function (file) {
      file = file.split('.')[0];
      const endpoint = require(path.join(__dirname, file));
      endpoint.poll(io);
      setInterval(() => {
        endpoint.poll(io);
      }, require(path.join(__dirname, file)).timeout || timeout); // If module specific timeout is specified, otherwise system default.
    });
};