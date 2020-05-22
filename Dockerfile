FROM node:12.16.3-alpine

RUN apk add --no-cache g++ gcc make python

RUN npm i -g nodemon

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 5000

CMD ["npm", "start"]
