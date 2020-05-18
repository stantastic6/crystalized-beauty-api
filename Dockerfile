FROM node:12.16.3-alpine

RUN npm i -g nodemon

RUN apk add g++ make python

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 5000

CMD ["npm", "start"]
