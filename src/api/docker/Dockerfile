FROM node:20.3.1

WORKDIR /api
COPY package*.json ./
RUN npm install
COPY . .

EXPOSE 5000

CMD ["node", "server.js"]
