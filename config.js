/**
 * Created by tristan on 17-8-17.
 */
module.exports = {
  telegram: {
    authToken: '122155087:AAGEGn5RJgzUEq3IMNS8TLQLUjr1lZwxUEc',
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
  poller: {
    timeout: 61 * 1000,
  },
  dbMappings: {
    area: {
      Alpha: 1,
      Bravo: 2,
      Charlie: 3,
      Delta: 4,
      Echo: 5,
      Foxtrot: 6,
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
