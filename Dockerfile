FROM node:16-buster-slim

ENV KARMA_BROWSER PhantomJS
RUN apt-get update && apt-get install -y libpng-dev python build-essential

WORKDIR /reactapp

ADD package.json package.json
RUN npm install
ADD . .

VOLUME /reactapp

EXPOSE 3000

CMD ["npm", "run", "start:production"]
