FROM node:21-alpine

WORKDIR /app/backend

COPY package.json .

RUN npm install

COPY . .

EXPOSE 8080

CMD [ "npm", "run", "dev" ]