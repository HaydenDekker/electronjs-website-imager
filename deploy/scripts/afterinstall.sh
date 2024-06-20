#!/bin/bash

echo "after install"

script_dir="$( dirname -- "$BASH_SOURCE" )"

echo $script_dir

cd $script_dir

echo "copy deployment files to docker folder for building"
mkdir ../runtime_env/app 
cp -R ../../dist ../runtime_env/app
cp -R ../../node_modules ../runtime_env/app
cp ../../package.json ../runtime_env/app

docker build -t website-imager ../runtime_env/