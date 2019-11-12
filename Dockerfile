FROM node:10.16

RUN npm -g install yarn

RUN mkdir -p /app/src
WORKDIR /app/src
ENV PATH /app/src/node_modules/.bin:${PATH}

ADD package.json /app/src
ADD yarn.lock /app/src
RUN yarn install

ADD . /app/src