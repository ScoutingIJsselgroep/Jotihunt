/* eslint-disable */

const fs = require('fs')
const path = require('path');
const basename = path.basename(__filename);

const timeout = require('./../../config').poller.timeout;

//load all routes in dir
module.exports = function () {
  fs
    .readdirSync(__dirname)
    .filter(function (file) {
      return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
    })
    .forEach(function (file) {
      file = file.split('.')[0];
      setInterval(() => {
        require(path.join(__dirname, file)).poll();
      }, timeout);
    });
};