#!/bin/sh

echo "Installing . . . ";
echo "\n";

# Running docker build and up commands in order to build docker images and up the containers.
sudo docker-compose build
sudo docker-compose up -d

echo "Installation Completed. Browse http://localhost:4200/";
echo "\n";
