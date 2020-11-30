FROM node:12.18.3

WORKDIR /usr/src/app

COPY package.json ./
COPY yarn.lock ./

RUN yarn

COPY . .

RUN yarn run build

RUN ls && ls dist

EXPOSE 8080

CMD yarn run start:prod