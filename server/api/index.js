/* eslint-disable */

const {
  REFRESH_GROUPS,
  REFRESH_HINTS,
  REFRESH_STATUS,
  REFRESH_CARS,
  REFRESH_ARTICLES
} = require('../socket_actions');

var fs = require('fs'),
  path = require('path');


//load all routes in dir
module.exports = function (app, server) {
  const io = require('socket.io')(server);

  io.on('connection', function (socket) {
    socket.on(REFRESH_HINTS, function () {
      io.emit(REFRESH_HINTS);
    });
    socket.on(REFRESH_STATUS, function () {
      io.emit(REFRESH_STATUS);
    });
    socket.on(REFRESH_CARS, function () {
      io.emit(REFRESH_CARS);
    });
    socket.on(REFRESH_GROUPS, function () {
      io.emit(REFRESH_GROUPS);
    });
    socket.on(REFRESH_ARTICLES, function () {
      io.emit(REFRESH_ARTICLES);
    });
  });

  // Make io accessible to our router
  app.use(function (req, res, next) {
    req.io = io;
    next();
  });

  fs
    .readdirSync(__dirname)
    .filter(function (file) {
      return (file.indexOf(".") !== -1) && (file !== "index.js");
    })
    .forEach(function (file) {
      file = file.split('.')[0];
      app.use('/api/' + file, require(path.join(__dirname, file)))

    })

};