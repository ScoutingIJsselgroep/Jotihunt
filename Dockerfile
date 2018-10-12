FROM node:8.12.0-alpine

ENV KARMA_BROWSER PhantomJS
RUN apk update && apk add libpng12-0

WORKDIR /reactapp

ADD package.json package.json
RUN npm install
ADD . .

VOLUME /reactapp

EXPOSE 3000

CMD ["npm", "run", "start:production"]
