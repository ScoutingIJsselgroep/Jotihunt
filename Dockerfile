# ###########
# Base stage
# ###########
FROM node:10.24.1 AS base

ENV KARMA_BROWSER PhantomJS
RUN apt-get update && apt-get install -y libpng-dev python build-essential
WORKDIR /reactapp

COPY package*.json ./
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

RUN npm run build

CMD ["npm", "run", "start:prod"]
