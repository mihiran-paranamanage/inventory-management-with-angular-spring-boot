FROM nginx:1.20-alpine
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
COPY ./dist/client /usr/share/nginx/html

#Dev Mode Start
#FROM node:14-alpine
#WORKDIR /client
#COPY package*.json ./
#RUN rm -rf ./node_modules && npm install
#EXPOSE 4200
#CMD ["npm", "start"]
#Dev Mode End
