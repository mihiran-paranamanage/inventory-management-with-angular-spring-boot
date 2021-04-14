FROM node:14-alpine
WORKDIR /client
COPY package*.json ./
RUN rm -rf ./node_modules && npm install
EXPOSE 4200
CMD ["npm", "start"]
