FROM node:latest

# Working dir
WORKDIR /app

# Copy files from Build
COPY package*.json ./

# Install Files
RUN npm install registry=https://registry.npmjs.org/ 

# Copy SRC
COPY . .

# Open Port
EXPOSE 3000

# Docker Command to Start Service
CMD [ "npm", "start" ]