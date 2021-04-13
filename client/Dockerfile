FROM node:14-alpine
WORKDIR /client
COPY package*.json ./
RUN npm install
EXPOSE 4200
CMD ["npm", "start"]
