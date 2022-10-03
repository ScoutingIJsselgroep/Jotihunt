/* eslint-disable */

const {
  REFRESH_GROUPS
} = require('../socket_actions');

var fs = require('fs'),
  path = require('path');


//load all routes in dir
module.exports = function (app, server) {
  const io = require('socket.io')(server);

  io.on('connection', function (socket) {
    socket.on('please_refresh_hints', function () {
      io.emit('please_refresh_hints');
    });
    socket.on('status', function () {
      io.emit('status');
    });
    socket.on('car', function () {
      io.emit('car');
    });
    socket.on(REFRESH_GROUPS, function () {
      io.emit(REFRESH_GROUPS);
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