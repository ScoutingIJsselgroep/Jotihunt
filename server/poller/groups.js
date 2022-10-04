const request = require('request');

const _ = require('lodash');
const telegram = require('../telegram');
const models = require('../models');

const config = require('../../config');


function upsert(group) {
    models.Group.findOne({
        where: {
            id: group.id
        }
    }).then((existingGroup) => {
        if (existingGroup && existingGroup.counter_hunt_points > group.counter_hunt_points) {
            // Send a message
            telegram.sendMessage(config.dbMappings.nArea[existingGroup.SubareaId - 1], `${group.name} uit ${group.city} is zojuist getegenhunt.`);

            // Increase number of tegenhunts
            existingGroup.increment("visits", {
                by: 1
            });

            // Add marker to map
            models.Hint.create({
                latitude: group.latitude,
                longitude: group.longitude,
                rdx: 0,
                rdy: 0,
                address: group.location,
                SubareaId: existingGroup.SubareaId,
                HintTypeId: 1,
                UserId: 1,
            });
        }
        if (existingGroup.counter_hunt_points < group.counter_hunt_point) {
            // Tegenhunt vereideld
            telegram.sendMessage(config.dbMappings.nArea[existingGroup.SubareaId - 1], `${group.name} uit ${group.city} heeft de tegenhunt vereideld.`);
        }
    });

    models.Group.upsert(group);
}


module.exports = {
    timeout: 1 * 60 * 1000, // Poll once every minute.
    poll(io) {
        request(`${process.env.API_URI}subscriptions`, (error, response, body) => {
            if (error) {
                telegram.sendMessage('Debug', error);
            }
            try {
                const result = JSON.parse(body).data;
                _.each(result, (group, id) => {
                    upsert({
                        id: id + 1,
                        name: group.name,
                        city: group.city,
                        location: `${group.name} (${group.accomodation}) ${group.street} ${group.housenumber} ${group.housenumber_addition ? group.housenumber_addition : ""} ${group.postcode} ${group.city}`,
                        latitude: parseFloat(group.lat),
                        longitude: parseFloat(group.long),
                        hunt_points: group.hunt_points || 0,
                        counter_hunt_points: group.counter_hunt_points || 0,
                        assignment_points: group.assignment_points || 0,
                        hint_points: group.hint_points || 0,
                        photo_assignment_points: group.photo_assignment_points || 0,
                        penalty_points: group.penalty_points || 0,
                    })
                });

            } catch (e) {
                console.error(e.message);
            }
        });
    },
};