const request = require('request');

const config = require('../../config');
const telegram = require('../telegram');
const models = require('../models');

const striptags = require('striptags');


module.exports = {
  poll() {
    request('https://jotihunt.net/api/1.0/opdracht', (error, response, body) => {
      if (error) {
        telegram.sendMessage('Debug', error);
      }
      const data = JSON.parse(body).data;

      models.Api.findAll().then((result) => {
        data.map((entry) => {
          const exists = result.map((dbEntry) => {
            if (parseInt(dbEntry.messageId) === parseInt(entry.ID)) {
              return true;
            }
            return false;
          });
          if (!exists.includes(true)) {
            request(`https://jotihunt.net/api/1.0/opdracht/${entry.ID}`, (error, response, specbody) => {
              const content = striptags(JSON.parse(specbody).data[0].inhoud);
              const message = `*Nieuwe opdracht*\n Titel: ${entry.titel} \n Eindtijd: ${entry.eindtijd} \n Punten: ${entry.maxpunten} \n https://jotihunt.net/subscription/message/${entry.ID} \n ${content}`;
              telegram.sendMessage('Opdracht', message);
              models.Api.build({
                messageId: entry.ID,
                title: entry.titel,
                content,
                ApiTypeId: config.dbMappings.type.Opdracht,
                start: entry.datum,
                end: entry.eindtijd,
                points: entry.maxpunten,
              }).save();
            });
          }
          return 0;
        });
      });
    });
  },
};
