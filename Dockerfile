FROM node:18.19.0-alpine

ENV TZ=Europe/Moscow

RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

WORKDIR /app

COPY . .

RUN cd web \
    && npm i \
    && npm run build \
    && cd ../server \
    && npm i \
    && npm run prod:build \
    && mkdir -p ./dist/clientApp \
    && cp -RT ../web/dist ./dist/clientApp \
    && cd ..

# Run app
CMD [ "node", "./index.js" ]
