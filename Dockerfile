FROM node:17.4.0

ENV KARMA_BROWSER PhantomJS
RUN apt-get update && apt-get install -y libpng-dev python build-essential
WORKDIR /reactapp

ADD package.json package.json
RUN npm install
ADD . .

VOLUME /reactapp

EXPOSE 3000

HEALTHCHECK CMD curl --fail http://localhost:3000 || exit 1   

CMD ["npm", "run", "start:production"]
