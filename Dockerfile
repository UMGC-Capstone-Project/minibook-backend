FROM node:16.13.0-alpine3.13

LABEL maintainer="David C. Mydlarz <dmydlarz@student.umgc.edu>"

WORKDIR /usr/src/app

ENV NODE_ENV=production

RUN apk update && \
    apk add git

RUN npm install -g @nestjs/cli
RUN npm install -g ts-node
RUN npm install

COPY package.json /usr/src/app
RUN npm ci --only=production && npm cache clean --force
COPY . /usr/src/app
# RUN git clone https://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@github.com/UMGC-Capstone-Project/minibook-backend.git /usr/src/app

EXPOSE 3000