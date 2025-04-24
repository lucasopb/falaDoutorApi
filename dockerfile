FROM node:20-alpine

RUN apk add --no-cache bash

WORKDIR /app

COPY package*.json ./

RUN npm install
RUN npm install -g typescript ts-node-dev

COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]