#/bin/bash

docker run --user 1000:1000 --detach -p 8084:8080 -v /home/hayden/Documents/website-imager:/app imager