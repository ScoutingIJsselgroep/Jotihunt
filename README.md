![Build status](https://github.com/ScoutingIJsselgroep/Jotihunt/actions/workflows/master.yml/badge.svg) ![Docker](https://img.shields.io/docker/pulls/tristandb/jotihunt.svg)

# Jotihunt.js
Jotihunt.js is een systeem ontwikkeld in React en maakt gebruik van verschillende microservices, zoals Clairvoyance en Divinity. Jotihunt.js draait zowel via Docker als lokaal.

## Development
1. Installeer NPM 6 (dit kan gemakkelijk via [nvm](https://github.com/creationix/nvm))
2. Installeer [Clairvoyance](https://github.com/ScoutingIJsselgroep/Clairvoyance) en pas het IP-adres en poort aan in `config.js`.
3. Installeer MySQL. Maak hierin een gebruiker aan en specificeer de gebruikersnaam en wachtwoord in `config/config.json`.
4. Draai achtereenvolgens `npm install` en `npm run build:dll`.
5. Vul de Telegram Authtoken, Google API key en Auth0 gegevens in in `setenvironment.sh` en draai `. ./setenvironment.sh`.
6. Draai de applicatie via `npm start`.

## Production
Voor Production moet je ook stap 2 en 3 volgen, behalve dat je Clairvoyance en MySQL in een beschermde environment draait (poorten zijn dus alleen bereikbaar door Jotihunt.js).
Daarna draai je Docker.
