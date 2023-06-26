FROM node:latest

# Working dir
WORKDIR /app/Client

# Copy files from Build
COPY /Client/package*.json ./

# Install Files
RUN npm install --registry=https://registry.npmjs.org/

# Copy SRC
COPY ./Client .


# Working dir
WORKDIR /app/Server

# Copy files from Build
COPY /Server/package*.json ./

# Copy SRC
COPY ./Server .

# Install Files
RUN npm install --registry=https://registry.npmjs.org/

# Open Port
EXPOSE 3000

# Docker Command to Start Service
CMD [ "npm", "start" ]