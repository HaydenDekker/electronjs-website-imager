#/bin/bash

container_id=$(docker ps -qf "ancestor=imager")

if [ -z "$container_id" ]; then
 echo "Imager not running."
 return 0
fi

docker stop ${container_id}