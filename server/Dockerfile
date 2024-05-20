FROM node:17.4.0-alpine

ENV TZ=Europe/Moscow

RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

WORKDIR /app

# COPY ./node_modules ./dist/node_modules
COPY ./package.json .
COPY ./dist/ .

RUN npm install

# Run app
CMD [ "node", "./index.js" ]
