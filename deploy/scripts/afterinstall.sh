#!/bin/bash

echo "after install"

script_dir="$( dirname -- "$BASH_SOURCE" )"

echo $script_dir

cd $script_dir

docker build -t website-imager ../runtime_env/

sudo cp -R -f ../../dist ~/website-imager
sudo cp -R -f ../../node_modules ~/website-imager

sudo chown root ~/website-imager/node_modules/electron/dist/chrome-sandbox
sudo chmod 4755 ~/website-imager/node_modules/electron/dist/chrome-sandbox

sudo cp -f ../../package.json ~/website-imager