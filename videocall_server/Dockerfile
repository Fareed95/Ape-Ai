FROM node:18-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install 

COPY . .

# Expose the port that the app runs on
EXPOSE 7500

# Command to run the app
CMD ["node", "index.js"]
