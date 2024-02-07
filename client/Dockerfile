FROM mhart/alpine-node:16

WORKDIR /client

COPY package.json .

COPY package-lock.json .

RUN npm config set registry https://registry.npmjs.org/

RUN npm install --no-audit

COPY . .

RUN npm run build

COPY .env /client/dist/
