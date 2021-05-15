#!/bin/sh

echo "Installing . . . ";

# Running docker build and up commands in order to build docker images and up the containers.
sudo docker-compose build
sudo docker-compose up -d

echo "Installation Completed. Browse http://localhost:4200/";
