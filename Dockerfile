# ###########
# Base stage
# ###########
FROM node:18.10-bullseye AS base

ENV KARMA_BROWSER PhantomJS
RUN apt-get update && apt-get install -y --no-install-recommends libpng-dev python build-essential autoconf automake g++ libpng-dev make

WORKDIR /reactapp

COPY package*.json ./

COPY internals/ /reactapp/internals/

RUN npm install

COPY . .

VOLUME /reactapp

EXPOSE 3000

HEALTHCHECK CMD curl --fail http://localhost:3000 || exit 1   

# ##################
# Development stage
# ##################

FROM base AS development

RUN npm run build:dll

CMD ["npm", "run", "start"]

# #################
# Production stage
# #################

FROM base AS production

CMD ["npm", "run", "start:production"]
