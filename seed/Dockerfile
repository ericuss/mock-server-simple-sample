FROM node:19-alpine as build
WORKDIR /app

COPY seed/package.json .
COPY seed/package-lock.json .

RUN npm i

COPY seed/ .

CMD npm start