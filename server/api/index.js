/* eslint-disable */

var fs = require('fs'),
    path = require('path');


//load all routes in dir
module.exports = function (app, server) {
  const io = require('socket.io')(server);

  io.on('connection', function(socket){
    console.log("Listening connection");
    socket.on('please_refresh_hints', function(){
      console.log("Refresh!");

      io.emit('please_refresh_hints');
    });
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
