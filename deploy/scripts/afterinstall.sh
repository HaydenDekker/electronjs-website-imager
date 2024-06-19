#!/bin/bash

echo "after install"

script_dir="$( dirname -- "$BASH_SOURCE" )"

echo $script_dir

cd $script_dir

docker build -t website-imager ../runtime_env/

mkdir -p ~/website-imager

echo "delete previous"
sudo rm -R ~/website-imager/dist
sudo rm -R ~/website-imager/node_modules
sudo rm -R ~/website-imager/package.json

echo "copy deployment files"
sudo cp -R -f ../../dist ~/website-imager
sudo cp -R -f ../../node_modules ~/website-imager
sudo cp -f ../../package.json ~/website-imager

echo "setting permissions"
sudo chown -R 1000:1000 ~/website-imager
sudo chown root ~/website-imager/node_modules/electron/dist/chrome-sandbox
sudo chmod 4755 ~/website-imager/node_modules/electron/dist/chrome-sandbox