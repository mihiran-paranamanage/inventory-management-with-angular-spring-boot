#!/bin/sh

echo "Installing . . . ";

cd ./server/;

./mvnw package

cd ../

sudo docker-compose build

sudo docker-compose up -d

echo "Installation Completed!";
