FROM node:latest

WORKDIR /app

COPY package*.json ./

RUN npm install --registry=https://registry.npmjs.org/

COPY . .

CMD [ "npm", "start" ]