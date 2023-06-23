FROM node:latest

# Working dir
WORKDIR /app/server

# Copy files from Build
COPY package*.json ./

# Install Files
RUN npm install 
# --registry=https://registry.npmjs.org/ 

# Copy SRC
COPY . .

# Open Port
EXPOSE 8080 8000

# Docker Command to Start Service
CMD [ "npm", "start" ]