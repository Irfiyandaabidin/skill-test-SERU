FROM node:18-alpine

WORKDIR /app

RUN npm install -g prisma

COPY package*.json ./

RUN npm install

COPY . .

RUN prisma generate --schema=./prisma/schema.prisma

EXPOSE 3000

CMD [ "npm", "run", "start" ]
