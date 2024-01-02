FROM node:21-alpine

RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app

WORKDIR /home/node/app

COPY package*.json ./
COPY tsconfig.json ./
COPY prisma ./prisma/
COPY migrate-and-start.sh ./
# this can be optional if you don't have any images
COPY images ./images/

USER node

RUN npm ci && npm cache clean --force && npx prisma generate

COPY --chown=node:node ./src ./src
COPY --chown=node:node ./public ./public

RUN npm run build

EXPOSE 3000

CMD [ "./migrate-and-start.sh" ]