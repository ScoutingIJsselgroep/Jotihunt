const request = require('request');

const config = require('../../config');
const telegram = require('../telegram');
const models = require('../models');


module.exports = {
  poll() {
    request('https://jotihunt.net/api/1.0/vossen', (error, response, body) => {
      if (error) {
        telegram.sendMessage('Debug', error);
      }

      const callback = (result) => {
        const data = JSON.parse(body).data;
        // Loop body.data
        data.map((subareaStatus) => {
          result.map((oldSubareaStatus) => {
            if (config.dbMappings.area[subareaStatus.team] === oldSubareaStatus.SubareaId) {
              // Determine if status is different
              if (config.dbMappings.status[subareaStatus.status] !== oldSubareaStatus.StatusId) {
                // Send message
                const message = `${config.telegram.status[subareaStatus.status]} ${subareaStatus.team} is op ${subareaStatus.status} gesprongen!`;
                telegram.sendMessage(subareaStatus.team, message);

                // Save entry to database.
                models.SubareaStatus.build({
                  StatusId: config.dbMappings.status[subareaStatus.status],
                  SubareaId: config.dbMappings.area[subareaStatus.team],
                }).save();
              }
            }
            return 0;
          });
          return 0;
        });
      };

      models.SubareaStatus.getLatest(callback);
    });
  },
};
