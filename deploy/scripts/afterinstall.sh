#!/bin/bash

echo "after install"

script_dir="$( dirname -- "$BASH_SOURCE" )"

echo $script_dir

cd $script_dir

docker build -t website-imager ../runtime_env/

cp -R ../../dist ~/website-imager

cp -R ../../node_modules ~/website-imager

cp -R ../../package.json ~/website-imager