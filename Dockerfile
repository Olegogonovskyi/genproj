FROM node:22-alpine

RUN mkdir /app
WORKDIR /app

COPY backend/package.json .

RUN npm i