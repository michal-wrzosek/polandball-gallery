FROM node:latest

RUN apt-get update && apt-get install -y curl apt-transport-https && \
    curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add - && \
    echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list && \
    apt-get update && apt-get install -y yarn

RUN mkdir -p /app 
WORKDIR /app

RUN npm i -g webpack webpack-dev-server@2
RUN yarn add --dev webpack webpack-dev-server@2

COPY package.json yarn.lock ./

RUN yarn install

COPY . ./

EXPOSE 3000