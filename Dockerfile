FROM node:14-alpine3.13

LABEL maintainer="Ronan Harris,M. Hanif Azhary"

WORKDIR /usr/es-backend-AegisAPI

COPY package.json ./

# Install node dependencies
RUN npm install

COPY . .

ARG PORT=3333

EXPOSE $PORT
