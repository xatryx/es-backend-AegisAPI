FROM node:14-alpine3.13

MAINTAINER Ronan Harris

WORKDIR /usr/es-backend-AegisAPI

COPY package.json ./

RUN npm install

COPY . .
