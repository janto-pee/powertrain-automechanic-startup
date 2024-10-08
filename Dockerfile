FROM node:10-alpine

WORKDIR /prisma

COPY package*.json ./

RUN npm install

COPY  . .

EXPOSE 8080

CMD [ "node", "index.ts" ]