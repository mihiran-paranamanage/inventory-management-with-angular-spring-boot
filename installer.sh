#!/bin/sh

echo -e "\n";
echo "Installing . . . ";
echo -e "\n";

# Running docker build and up commands in order to build docker images and up the containers.
sudo docker-compose build
sudo docker-compose up -d

echo -e "\n";
echo "Installation Completed. Browse http://localhost:4200/";
echo -e "\n";
