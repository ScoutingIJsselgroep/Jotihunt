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
    bot.sendMessage(config.telegram.chats[subarea], `🧩 Puzzel opgelost! Deze wijst naar ${address}. Toon op Google Maps: https://www.google.com/maps/search/?api=1&query=${lat},${lng}`);
    bot.sendLocation(config.telegram.chats[subarea], lat, lng);
  },
  sendHunt(subarea, lat, lng, address, createdAt) {
    // Get next hunt time
    createdAtDate = new Date(createdAt);
    createdAtDate.setHours(createdAtDate.getHours() + 1)
    const time = createdAtDate.getHours() + ':' + createdAtDate.getMinutes();

    bot.sendMessage(config.telegram.chats[subarea], `🔫 Hunt op ${address}!
      1. Geef correcte tijd en locatie door aan de thuisbasis.
      2. Vul je hunt in via www.jotihunt.net met gebruikersnaam \`jotihunt@scouting-ijsselgroep.nl\` en wachtwoord
\`scouting70lordbaden\`.
      3. De vossen mogen pas om ${time} uur weer gehunt worden.
      4. Bepaal de taktiek voor het komende uur.`);
    // bot.sendLocation(config.telegram.chats[subarea], lat, lng);
  },
  sendSimpleLocation(subarea, lat, lng, address) {
    bot.sendMessage(config.telegram.chats[subarea], `Een tussenstop op ${address}. Toon op Google Maps: https://www.google.com/maps/search/?api=1&query=${lat},${lng}`);
    bot.sendLocation(config.telegram.chats[subarea], lat, lng);
  },
};
