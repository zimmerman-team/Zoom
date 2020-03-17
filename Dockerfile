# base
FROM node:8.7-alpine as build
WORKDIR /usr/src/app

# install packages
COPY package.json ./
RUN npm install --silent
COPY . .

# watchman and relay
RUN apk add --no-cache libcrypto1.0 libgcc libstdc++
COPY --from=icalialabs/watchman:4-alpine3.4 /usr/local/bin/watchman* /usr/local/bin/
RUN mkdir -p /usr/local/var/run/watchman \
    && touch /usr/local/var/run/watchman/.not-empty
RUN npm run relay

# build react
RUN npm run build

# serve build with nginx
FROM nginx:1.16.0-alpine
COPY --from=build usr/src/app/build /usr/share/nginx/html
COPY --from=build usr/src/app/etc/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80

# run
CMD ["sh","-c","nginx -g 'daemon off;'"]
