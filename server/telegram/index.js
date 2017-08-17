/**
  Allows user to send messages to the Telegram API.
*/

const TelegramBot = require('node-telegram-bot-api');
const config = require('../../config');

const token = config.telegram.authToken;

const bot = new TelegramBot(token, {polling: true});

module.exports = {
  sendMessage(subarea, message) {
    bot.sendMessage(config.telegram.chats[subarea], message);
  },
  sendLocation(subarea, lat, lng){
    bot.sendLocation(config.telegram.chats[subarea], lat, lng);
  }
};
