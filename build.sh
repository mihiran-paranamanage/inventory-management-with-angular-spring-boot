#!/bin/sh

echo -e "\n";
echo "Starting the build . . . ";
echo -e "\n";

# Build the angular client app
cd ./client/;
sudo ng build --prod
cd ../

# Build the spring boot server app
cd ./server/;
sudo ./mvnw package
cd ../

# Delete build folder if exists and then created new necessary folders. then give permissions.
sudo rm -rf ./build
sudo mkdir -p build/client/dist/client
sudo mkdir -p build/server/target
sudo chmod -R 777 ./build

# Copy necessary build artifacts from the angular client app
sudo cp -R ./client/Dockerfile ./build/client/
sudo cp -R ./client/nginx.conf ./build/client/
sudo cp -R ./client/dist/client/ ./build/client/dist/

# Copy necessary build artifacts from the spring boot server app
sudo cp -R ./server/Dockerfile ./build/server/
sudo cp -R ./server/target/ ./build/server/

# Copy necessary build artifacts from the root folder
sudo cp -R ./docker-compose.yml ./build/
sudo cp -R ./installer.sh ./build/

# Creating the final zip file with all the necessary build artifacts
sudo zip -r ./build/ims-stable-v0.0.1.zip ./build

echo -e "\n";
echo "Build Completed!";
echo -e "\n";