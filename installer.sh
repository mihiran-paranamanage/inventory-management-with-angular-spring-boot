#!/bin/sh

echo "Installing . . . ";

sudo docker-compose build
sudo docker-compose up -d

echo "Installation Completed!";
