FROM node:21-alpine

RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app

WORKDIR /home/node/app

COPY package*.json ./
COPY tsconfig.json ./

USER node

RUN npm ci && npm cache clean --force

COPY --chown=node:node ./src ./src
COPY --chown=node:node ./public ./public

RUN npm run build

EXPOSE 3000

#CMD [ "node", "./src/index.js" ]
CMD [ "node", "./dist/index.js" ]