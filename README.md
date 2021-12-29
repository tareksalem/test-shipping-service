# Shipment Service

## About
This is a service that can be used to be integrated in ordering system to enable the ordering system to create shipment profile while he ordering a specific product

## Technologies Used
In this Project There is multiple technologies are used here are the main packages
- typecript: for strong type definitions
- nodejs: as the js server side environment
- graphql: as the application layer for contacting the service via http requests
- mikro orm: as the orm and database modeling
- grand-connectors: for dependency injection and applying repository pattern
- type-graphql: for graphql and models type definitions to make a single source of truth
- postgresql: as relational database
- sqlite: as relational in-memory database for testing
- jest: as testing tool and code coverage
- docker-compose: for dockerizing the application for better shipment and running
- class-validator: for validating graphql inputs and arguments
- apollo express server: for building graphql server using express.js


## Service Architecture

this service applies some concepts from clean architecture pattern, it distributes the application structure to the following:
- application layer: this is the application layer which responsible for handling incoming communication and request
- domain layer: this layer is responsible for defining our entities, and type-graphql is used here for applying dry definition and single source of truth
- repository layer: this is a middle layer for communicating with the lower layer which is domain layer and database for interacting with database
- service layer: this layer is also a middle layer for handling the communication between the application layer and the lower layers, they can be repositories, other services or outside http request

## How to run
you can run this application in different ways:
- ### using typescript: for this usage you can run the following commands:
```cmd
npm i
```
then run the application using the following command
```cmd
npm run dev
```
### using nodejs
run the following commands
```cmd
npm run i
```
```
npm start
```
### using docker
Assume you have docker installed on your machine, then run the following command for running in detached mode
```
docker-compose up -d
```
**Note:** in `package.json` file there is migration script which is related to migration purpose via commands, however the application check the migration automatically when it's running

**Note:** apollo graphql palyground is enabled by default, once you run the application, you can go to `localhost:port/graphql` and start testing the APi

**Note:** the `.env` file is attached to the repository for testing purpose, you can use it or edit the env variable values to the values you want
## Testing
Jest is used for testing, to see the test result you can run the following command
```cmd
npm run test
```

