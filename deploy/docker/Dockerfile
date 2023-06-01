FROM node:18-bullseye as builder

WORKDIR /usr/src/build

COPY package*.json ./

RUN npm install

RUN npm install --arch=arm64 --platform=linuxmusl sharp

COPY --chown=node:node . .

RUN npm run build

FROM node:18-bullseye

WORKDIR /usr/src/app

COPY --chown=node:node package.json ./

COPY --chown=node:node --from=builder /usr/src/build/node_modules ./node_modules

COPY --chown=node:node --from=builder /usr/src/build/dist ./dist

RUN chown -R node:node /usr/src/app

RUN chmod 755 /usr/src/app

USER node

ARG RAILWAY_STATIC_URL

ARG PUBLIC_URL

ARG PORT

CMD npm start
