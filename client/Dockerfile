FROM node:14 as builder

WORKDIR /client

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

COPY .env /client/dist/
