FROM node:20-alpine
USER node
WORKDIR /home/node/app
COPY --chown=node:node . .
RUN npm install
CMD [ "npx", "remix", "dev"]

