FROM node:latest


# Working dir
WORKDIR /app

# Copy files from Build
COPY package*.json ./

# Copy SRC
COPY . .

# Install Files
RUN npm install 

# Open Port
EXPOSE 8080

# Docker Command to Start Service
CMD [ "npm", "start” ]