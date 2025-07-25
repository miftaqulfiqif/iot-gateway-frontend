FROM node:18

WORKDIR /app

COPY package*.json ./

RUN npm install
RUN npm audit fix

COPY . .

CMD ["npm", "run", "dev"]