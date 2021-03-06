/* eslint consistent-return:0 */

const express = require('express');
const bodyParser = require('body-parser');
const logger = require('./logger');
const telegram = require('./telegram');

const models = require('./models');

const argv = require('minimist')(process.argv.slice(2));
const setup = require('./middlewares/frontendMiddleware');
const isDev = process.env.NODE_ENV !== 'production';
const ngrok = (isDev && process.env.ENABLE_TUNNEL) || argv.tunnel ? require('ngrok') : false;
const resolve = require('path').resolve;
const app = express();
app.use(bodyParser.json());
const server = require('http').Server(app);


// If you need a backend, e.g. an API, add your custom backend-specific middleware here
require('./api')(app, server);

// Import poller
require('./poller')();

// In production we need to pass these values in instead of relying on webpack
setup(app, {
  outputPath: resolve(process.cwd(), 'app'),
  publicPath: '/',
});

// get the intended host and port number, use localhost and port 3000 if not provided
const customHost = argv.host || process.env.HOST;
const host = customHost || null; // Let http.Server use its default IPv6/4 host
const prettyHost = customHost || 'localhost';

const port = argv.port || process.env.PORT || 3000;

// Start your app.
models.sequelize.sync().then(() => {
  server.listen(port, host, (err) => {
    if (err) {
      return logger.error(err.message);
    }

    // Telegram start web server
    telegram.sendMessage('Debug', '🖥️ De server is gestart!');
    if (false) {
      telegram.sendMessage('Nieuws', 'We zijn weer bezig met het verbeteren van de website. Je kunt daarom via verschillende Telegram-kanalen af en toe een bericht krijgen. Geen berichten meer krijgen? Mute dan de deelgebieden of verlaat de kanalen met deelgebieden. Je kunt later weer toegevoegd worden.');
    }

    // Connect to ngrok in dev mode
    if (ngrok) {
      ngrok.connect(port, (innerErr, url) => {
        if (innerErr) {
          return logger.error(innerErr);
        }

        logger.appStarted(port, prettyHost, url);
      });
    } else {
      logger.appStarted(port, prettyHost);
    }
  });
});
