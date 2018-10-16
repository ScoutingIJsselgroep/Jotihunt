/**
 * Created by tristan on 17-8-17.
 */
module.exports = {
  wiki: 'https://raw.githubusercontent.com/ScoutingIJsselgroep/JotihuntWiki/master/README.md',
  telegram: {
    authToken: process.env.TELEGRAM_TOKEN,
    chats: {
      Alpha: -153752986,
      Bravo: -157632620,
      Charlie: -172605996,
      Delta: -169765091,
      Echo: -155957029,
      Foxtrot: -154182675,
      Opdracht: -172862895,
      Nieuws: -171983874,
      Debug: -271734194,
    },
    status: {
      rood: '\ud83c\ude34',
      oranje: '\ud83c\ude36',
      groen: '\ud83c\ude2f',
    },
  },
  map: {
    // Circle around homebase
    homebaseCircle: {
      latitude: 52.199165,
      longitude: 6.214124,
      radius: 500,
    },
    filename: "jotihunt2018.kml",
    // The amount of hours to keep in history on the MassiveMap
    historyTime: 10,
    // The walking speed (sky wide) in km/h by a average human
    walkingSpeed: 3.6,
  },
  google: {
    googleAppId: process.env.GOOGLE_AUTH_TOKEN,
  },
  poller: {
    timeout: process.env.POLLER_INTERVAL_SECONDS * 1000,
  },
  clairvoyance: {
    ip: '142.93.137.62',
    port: 1337,
  },
  dbMappings: {
    nArea: ['Alpha', 'Bravo', 'Charlie', 'Delta', 'Echo', 'Foxtrot'],
    area: {
      Alpha: 1,
      Bravo: 2,
      Charlie: 3,
      Delta: 4,
      Echo: 5,
      Foxtrot: 6,
    },
    hintType: {
      hint: 1,
      hunt: 2,
      message: 3,
    },
    status: {
      groen: 1,
      oranje: 2,
      rood: 3,
    },
    type: {
      Opdracht: 1,
      Hint: 2,
      Nieuws: 3,
    },
  },
};
