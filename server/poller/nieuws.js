const request = require('request');

const config = require('../../config');
const telegram = require('../telegram');
const models = require('../models');

const striptags = require('striptags');


module.exports = {
  poll() {
    request('https://jotihunt.net/api/1.0/nieuws', (error, response, body) => {
      if (error) {
        telegram.sendMessage('Debug', error);
      }
      try {
        const data = JSON.parse(body).data;

        models.Api.findAll().then((result) => {
          data.map((entry) => {
            const exists = result && result.map((dbEntry) => {
              if (parseInt(dbEntry.messageId) === parseInt(entry.ID)) {
                return true;
              }
              return false;
            });
            if (!result || !exists.includes(true)) {
              request(`https://jotihunt.net/api/1.0/nieuws/${entry.ID}`, (error, response, specbody) => {
                const content = striptags(JSON.parse(specbody).data[0].inhoud);
                const message = `🧞 ${entry.titel} \n Tijdstip: ${entry.datum} \n ${content}`;
                telegram.sendMessage('Nieuws', message);
                models.Api.build({
                  messageId: entry.ID,
                  title: entry.titel,
                  content,
                  ApiTypeId: config.dbMappings.type.Nieuws,
                  start: entry.datum,
                  end: entry.lastupdate,
                }).save();
              });
            }
            return 0;
          });
        });
      } catch (e) {
        //
      }
    });
  },
};
