FROM node:21-alpine

RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app

WORKDIR /home/node/app

COPY package*.json ./

USER node

RUN npm ci && npm cache clean --force

COPY --chown=node:node ./src ./src
COPY --chown=node:node ./public ./public

EXPOSE 3000

CMD [ "node", "./src/index.js" ]