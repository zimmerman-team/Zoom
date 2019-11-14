FROM node:8.7.0-alpine

WORKDIR usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN sed -i "s/localhost:4200/server:4200/" package.json

RUN apk add --no-cache libcrypto1.0 libgcc libstdc++

COPY --from=icalialabs/watchman:4-alpine3.4 /usr/local/bin/watchman* /usr/local/bin/

RUN mkdir -p /usr/local/var/run/watchman \
    && touch /usr/local/var/run/watchman/.not-empty

RUN npm run relay

CMD ["npm", "run", "start"]