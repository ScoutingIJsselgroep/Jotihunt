const {
  auth
} = require('express-oauth2-jwt-bearer');

const checkJwt = auth({
  audience: 'https://jotihunt.scouting-ijsselgroep.nl/api',
  issuerBaseURL: `https://jotihunt-js.eu.auth0.com/`,
});

module.exports = checkJwt;