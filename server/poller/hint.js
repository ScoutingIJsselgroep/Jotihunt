const request = require('request');

const config = require('../../config');
const telegram = require('../telegram');
const models = require('../models');


module.exports = {
  poll() {
    request('https://jotihunt.net/api/1.0/hint', (error, response, body) => {
      if (error) {
        telegram.sendMessage('Debug', error);
      }
      const data = JSON.parse(body).data;

      models.Api.findAll().then((result) => {
        if (data) {
          data.map((entry) => {
            const exists = result && result.map((dbEntry) => {
              if (parseInt(dbEntry.messageId) === parseInt(entry.ID)) {
                return true;
              }
              return false;
            });
            if (!result || !exists.includes(true)) {
              const message = 'Er is een nieuwe hint binnen, we zijn ermee bezig!';
              telegram.sendMessage('Alpha', message);
              telegram.sendMessage('Bravo', message);
              telegram.sendMessage('Charlie', message);
              telegram.sendMessage('Delta', message);
              telegram.sendMessage('Echo', message);
              telegram.sendMessage('Foxtrot', message);
              models.Api.build({
                messageId: entry.ID,
                title: entry.titel,
                ApiTypeId: config.dbMappings.type.Hint,
                start: entry.datum,
              }).save();
            }
            return 0;
          });
        }
      });
    });
  },
};
