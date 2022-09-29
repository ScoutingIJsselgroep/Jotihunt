const request = require('request');

const config = require('../../config');
const telegram = require('../telegram');
const models = require('../models');


module.exports = {
  poll() {
    request(`${process.env.API_URI}areas`, (error, response, body) => {
      if (error) {
        telegram.sendMessage('Debug', error);
      }
      try {
        const data = JSON.parse(body).data;

        // Create callback that is called after results from database are retrieved
        const callback = (result) => {
          // Loop results
          data.map((subareaStatus) => {
            // Loop current subareas, retrieved from database
            result.map((oldSubareaStatus) => {
              // Match subarea with corresponsing subarea in database
              if (config.dbMappings.area[subareaStatus.name] === oldSubareaStatus.SubareaId) {
                // Determine if status is different
                if (config.dbMappings.status[subareaStatus.status].id !== oldSubareaStatus.StatusId) {
                  // Status is different, we send a message to notify subscribers
                  const message = `${config.telegram.status[subareaStatus.status]} ${subareaStatus.name} is op ${config.dbMappings.status[subareaStatus.status].translation} gesprongen!`;
                  telegram.sendMessage(subareaStatus.name, message);

                  // Save entry to database.
                  models.SubareaStatus.build({
                    StatusId: config.dbMappings.status[subareaStatus.status].id,
                    SubareaId: config.dbMappings.area[subareaStatus.name],
                  }).save();
                }
              }
              return 0;
            });
            return 0;
          });
        };
        models.SubareaStatus.getLatest(callback);
      } catch (e) {
        console.error(e.message);
      }
    });
  },
};