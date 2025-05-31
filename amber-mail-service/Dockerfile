FROM node:22

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .

EXPOSE 1338

CMD ["npm", "run", "dev"]