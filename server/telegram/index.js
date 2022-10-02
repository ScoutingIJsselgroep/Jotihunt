/**
 Allows user to send messages to the Telegram API.
 */

const TelegramBot = require('node-telegram-bot-api');
const config = require('../../config');

const token = config.telegram.authToken;

const bot = new TelegramBot(token, {
  polling: false
});

module.exports = {
  sendMessage(subarea, message) {
    if (process.env.SEND_MESSAGE) {
      console.log(subarea)
      bot.sendMessage(config.telegram.chats[subarea], message);
    }
  },
  sendHint(subarea, lat, lng, address) {
    if (process.env.SEND_MESSAGE) {
      bot.sendMessage(config.telegram.chats[subarea], `🧩 ${subarea} naar ${address}`);
      bot.sendLocation(config.telegram.chats[subarea], lat, lng);
    }
  },
  sendHunt(subarea, lat, lng, address, createdAt) {
    if (process.env.SEND_MESSAGE) {
      // Get next hunt time
      createdAtDate = new Date(createdAt);
      createdAtDate.setHours(createdAtDate.getHours() + 1)
      const time = (createdAtDate.getHours() + 2) + ':' + createdAtDate.getMinutes();

      bot.sendMessage(config.telegram.chats[subarea], `🔫 Hunt op ${address} voor ${subarea}!
        1. Geef correcte tijd en locatie door aan de thuisbasis.
        2. Vul je hunt in via www.jotihunt.nl met gebruikersnaam \`${process.env.JOTIHUNT_USERNAME}\` en wachtwoord
  \`${process.env.JOTIHUNT_PASSWORD}\`.
        3. De vossen mogen pas om ${time} uur weer gehunt worden.
        4. Bepaal de taktiek voor het komende uur.`);
    }
  },
  sendSimpleLocation(subarea, lat, lng, address) {
    if (process.env.SEND_MESSAGE) {
      bot.sendMessage(config.telegram.chats[subarea], `${subarea} op ${address}`);
      bot.sendLocation(config.telegram.chats[subarea], lat, lng);
    }
  },
};