App to vote your favourite programming language
=========

Getting started
---------------

Download [Docker Desktop](https://www.docker.com/products/docker-desktop) for Mac or Windows. [Docker Compose](https://docs.docker.com/compose) will be automatically installed. On Linux, make sure you have the latest version of [Compose](https://docs.docker.com/compose/install/). 

## Docker

The Linux stack uses Python, Node.js, Java, with Redis for messaging and Postgres for storage.

> If you're using [Docker Desktop on Windows](https://store.docker.com/editions/community/docker-ce-desktop-windows), you can run the Linux version by [switching to Linux containers](https://docs.docker.com/docker-for-windows/#switch-between-windows-and-linux-containers), or run the Windows containers version.

Run in this directory:
```
docker-compose up
```
The app will be running at [http://localhost:5000](http://localhost:5000), and the results will be at [http://localhost:5001](http://localhost:5001).

Alternately, if you want to run it on a [Docker Swarm](https://docs.docker.com/engine/swarm/), first make sure you have a swarm. If you don't, run:
```
docker swarm init
```
Once you have your swarm, in this directory run:
```
docker stack deploy --compose-file docker-stack.yml vote
```

Use the remove script here to clean all the stuff and relaunch the app

Run the app in Kubernetes
-------------------------

The folder k8s-specifications contains the yaml specifications of the Voting App's services.

First create the vote namespace

```
$ kubectl create namespace vote
```

Run the following command to create the deployments and services objects:
```
$ kubectl create -f k8s-specifications/
deployment "db" created
service "db" created
deployment "redis" created
service "redis" created
deployment "result" created
service "result" created
deployment "vote" created
service "vote" created
deployment "worker" created
```

The vote interface is then available on port 31000 on each host of the cluster, the result one is available on port 31001.

Architecture
-----

![image](https://user-images.githubusercontent.com/31995078/120103561-ddf47380-c158-11eb-91c1-05dcab54d1dc.png)

* A front-end web app in [Python](/vote) which lets you vote between programming different languages.
* A [Redis](https://hub.docker.com/_/redis/) queue which collects new votes.
* A [Java](/worker/src/main) worker which consumes votes and stores them in database.
* A [Postgres](https://hub.docker.com/_/postgres/) database backed by a Docker volume.
* A [Node.js](/result) webapp which shows the results of the voting in real time.


Note
----

The microservice application only accepts one vote per client. It does not register votes if a vote has already been submitted from a client.
