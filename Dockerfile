FROM node:latest

WORKDIR /home/node/app

COPY package*.json ./

RUN npm install

RUN npm install nodemon --save-dev

COPY . .

EXPOSE 3030

CMD [ "npm", "start" ]

