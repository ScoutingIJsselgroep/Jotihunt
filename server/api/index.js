/* eslint-disable */
var fs = require('fs'),
  path = require('path');


//load all routes in dir
module.exports = function (app) {

  fs
    .readdirSync(__dirname)
    .filter(function (file) {
      return (file.indexOf(".") !== -1) && (file !== "index.js");
    })
    .forEach(function (file) {
      file = file.split('.')[0];
      app.use('/api/' + file, require(path.join(__dirname, file)))

    });
};