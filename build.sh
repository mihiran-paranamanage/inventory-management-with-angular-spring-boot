#!/bin/sh

echo "Starting the build . . . ";

cd ./client/;
sudo ng build --prod
cd ../
cd ./server/;
sudo ./mvnw package
cd ../

sudo rm -rf ./build
sudo mkdir -p build/client/dist/client
sudo mkdir -p build/server/target
sudo chmod -R 777 ./build

sudo cp -R ./client/Dockerfile ./build/client/
sudo cp -R ./client/nginx.conf ./build/client/
sudo cp -R ./client/dist/client/ ./build/client/dist/

sudo cp -R ./server/Dockerfile ./build/server/
sudo cp -R ./server/target/ ./build/server/

sudo cp -R ./docker-compose.yml ./build/
sudo cp -R ./installer.sh ./build/

sudo zip -r ./build/ims-stable-v0.0.1.zip ./build

echo "Build Completed!";
