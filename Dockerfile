# base
FROM node:11.15 as build

WORKDIR /usr/src/app

# install packages
COPY package.json ./
# To handle 'not get uid/gid'
RUN npm config set unsafe-perm true
RUN npm install --silent

# copy src files
COPY . .

# watchman and relay
RUN git clone https://github.com/facebook/watchman.git \
    && cd watchman \
    && git checkout v3.1 \
    && ./autogen.sh \
    && ./configure \
    && make \
    && make install
RUN npm run relay

# build react
RUN npm run build-on-docker

# serve build with nginx
FROM nginx:1.16.0-alpine
COPY --from=build usr/src/app/build /usr/share/nginx/html
COPY --from=build usr/src/app/etc/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80

# run
CMD ["sh","-c","nginx -g 'daemon off;'"]