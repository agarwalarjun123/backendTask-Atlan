# ATLAN-TASK

![Atlan-Logo](static/atlan.png) 

Atlan is a data democratization company that helps teams collaborate frictionlessly on data projects.This is a internship task for a Backend Developer Internship where the task given is to build a solution for providing large scale concurrency in long running tasks. In this case A long running task is a csv file that consists of 1-2 million records. These records have to parsed and indexed into a Database concurrently. The solution provided should be able to terminate running tasks and restart the task.

## Features

- [x] Concurrency upto 8 tasks with a single docker container
- [x]  MongoDB Transactions
- [x] Horizontly scaling by increasing docker containers
- [x] WebAdmin for monitoring running tasks
- [x] NodeJS Clustering for reducing downtime


### Things to Do

- **Stop Process** better solution than killing of cluster Node
- Writing cleaner IPC Code

## Architecture Diagram

![Architecture Diagram](static/Architecture.png)

## Structure 

- MongoDB - used for maintaining state of tasks

- BULL - A Task Queue built on top of redis

- REDIS - A broker for BULL

- NodeJS BULL Processes - A Pool of worker processes work on a long running task.

## Requirements
    
    docker , docker-compose 

## Installation Steps

    Change the permission of run script for spawning docker containers using the docker-compose.yml file.

    chmod +x run
    ./run
    
    Go to http://localhost:3000/ to view the WebGUI Admin
    
    Master process logs can be accessed using
    sudo docker logs -f node_master

    Worker process logs can be accessed using
    sudo docker logs -f node_worker
