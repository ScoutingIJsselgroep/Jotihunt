const request = require('request');

const _ = require('lodash');
const config = require('../../config');
const moment = require('moment');
const telegram = require('../telegram');
const models = require('../models');

const striptags = require('striptags');

const {
    REFRESH_ARTICLES
} = require('../socket_actions');

// Set moment locale
moment.locale('nl')

function prepareContent(message) {
    return striptags(message.content.replace('<br>', '\n\n').replace('<li>', ' * ').replace('</li>', '\n').replace('&nbsp;', ' '), allowed_tags = ['a', 'strong', 'b', 's', 'i', 'u', 'code', 'pre']);
}

module.exports = {
    poll(io) {
        request(`${process.env.API_URI}articles`, (error, response, body) => {
            if (error) {
                telegram.sendMessage('Debug', error);
            }
            try {
                const data = JSON.parse(body).data;
                _.each(data, (article, id) => {
                    let articleType;
                    switch (article.type) {
                        case "news":
                            articleType = config.dbMappings.type.Nieuws;
                            break;
                        case "hint":
                            articleType = config.dbMappings.type.Hint;
                            break;
                        case "assignment":
                            articleType = config.dbMappings.type.Opdracht;
                            break;
                    }

                    const start = isNaN(Date.parse(article.publish_at)) ? null : Date.parse(article.publish_at)
                    const end = isNaN(Date.parse(article.message.end_time)) ? null : Date.parse(article.message.end_time)

                    const message = {
                        id: article.id,
                        title: article.title,
                        content: article.message.content,
                        start,
                        end,
                        points: article.message.max_points || null,
                        ApiTypeId: articleType
                    }

                    models.Api.upsert(message, {
                        returning: true
                    }).then((obj) => {

                        if (obj[1]) {
                            // New object was added, we'll submit a message to telegram
                            const message = obj[0].dataValues

                            switch (article.type) {
                                case "news":
                                    const newsMessage = `<b>${message.title}</b> \n<i>Tijdstip: ${moment(message.start).add(2, 'hours').calendar()}</i> \n${prepareContent(message)}`;
                                    telegram.sendMessage("Nieuws", newsMessage);
                                    break;
                                case "hint":
                                    const hintMessage = `<b>Nieuwe hint</b> \n<i>Tijdstip: ${moment(message.start).add(2, 'hours').calendar()}</i> \nEr is een nieuwe hint binnen, we zijn ermee bezig!`;
                                    telegram.sendMessage('Alpha', hintMessage);
                                    telegram.sendMessage('Bravo', hintMessage);
                                    telegram.sendMessage('Charlie', hintMessage);
                                    telegram.sendMessage('Delta', hintMessage);
                                    telegram.sendMessage('Echo', hintMessage);
                                    telegram.sendMessage('Foxtrot', hintMessage);
                                    break;
                                case "assignment":
                                    const assignmentMessage = `<b>${message.title}</b> \n<i>Deadline: ${moment(message.end).add(2, 'hours').calendar()}</i> \nPunten: ${message.points} \n ${prepareContent(message)}`;
                                    telegram.sendMessage('Opdracht', assignmentMessage);
                                    break;
                            }

                            io.emit(REFRESH_ARTICLES);
                        }
                    });
                });
            } catch (e) {
                console.error(e.message);
            }
        });
    },
};

module.exports.poll()