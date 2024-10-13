FROM node:20-bullseye as builder

RUN mkdir app

WORKDIR /app

COPY package*.json ./

RUN npm install

RUN npm prisma generate

RUN npm tsc

FROM node:10-alpine AS runner

COPY --chown=node:node --from=builder /app/package*.json ./

COPY --chown=node:node --from=builder /app/build ./

RUN npm install && npm cache clean --all

COPY --chown=node:node --from=builder /app/node_modules/.prisma/client ./node_modules/.prisma/client

EXPOSE 8080

CMD [ "node", "src/index.js" ]