/**
 Allows user to send messages to the Telegram API.
 */

const TelegramBot = require('node-telegram-bot-api');
const config = require('../../config');

const token = config.telegram.authToken;

const bot = new TelegramBot(token, { polling: false });

module.exports = {
  sendMessage(subarea, message) {
    bot.sendMessage(config.telegram.chats[subarea], message);
  },
  sendHint(subarea, lat, lng, address) {
    bot.sendMessage(config.telegram.chats[subarea], `Puzzel opgelost! Deze wijst naar ${address}.`);
    bot.sendLocation(config.telegram.chats[subarea], lat, lng);
  },
};
