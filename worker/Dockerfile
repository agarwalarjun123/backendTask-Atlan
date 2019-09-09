FROM node:alpine

WORKDIR /usr/src/app

COPY package.json package.json

RUN npm install

COPY . . 

EXPOSE 3000

CMD ["./node_modules/nodemon/bin/nodemon","worker"]
