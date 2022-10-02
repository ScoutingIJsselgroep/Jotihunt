const request = require('request');

const _ = require('lodash');
const telegram = require('../telegram');
const models = require('../models');

module.exports = {
    timeout: 1 * 60 * 1000, // Poll once every 1 minute.
    poll() {
        request(`${process.env.API_URI}subscriptions`, (error, response, body) => {
            if (error) {
                telegram.sendMessage('Debug', error);
            }
            try {
                console.log(body);
                const result = JSON.parse(body).data;
                _.each(result, (group, id) => {
                    models.Group.upsert({
                        id: id + 1,
                        name: group.name,
                        city: group.city,
                        location: `${group.name} (${group.accomodation}) <br /> ${group.street} ${group.housenumber} ${group.housenumber_addition} <br /> ${group.postcode} ${group.city}`,
                        latitude: parseFloat(group.lat),
                        longitude: parseFloat(group.long),
                        hunt_points: group.hunt_points || 0,
                        counter_hunt_points: group.counter_hunt_points || 0,
                        assignment_points: group.assignment_points || 0,
                        hint_points: group.hint_points || 0,
                        photo_assignment_points: group.photo_assignment_points || 0,
                        penalty_points: group.penalty_points || 0,
                    });
                });

            } catch (e) {
                console.error(e.message);
            }
        });
    },
};