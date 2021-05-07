#!/bin/sh

echo "Installing . . . ";

#Dev Mode Start
#cd ./client/;
#sudo ng build --prod
#cd ../
#cd ./server/;
#sudo ./mvnw package
#cd ../
#Dev Mode End

sudo docker-compose build
sudo docker-compose up -d

echo "Installation Completed!";
