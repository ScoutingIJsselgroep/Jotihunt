/* eslint-disable */

var fs = require('fs'),
  path = require('path');
  timeout = require('./../../config').poller.timeout;


//load all routes in dir
module.exports = function () {
  fs
    .readdirSync(__dirname)
    .filter(function (file) {
      return (file.indexOf(".") !== -1) && (file !== "index.js");
    })
    .forEach(function (file) {
      file = file.split('.')[0];
      setInterval(() => {
        require(path.join(__dirname, file)).poll();
      }, timeout);
    });
};
