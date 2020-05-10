#!/bin/bash

for i in `docker ps -a | awk '{print $1}'`
do
    docker rm $i
done

for i in `docker images | awk '{print $1}'`
do
    docker rmi $i
done

docker-compose up