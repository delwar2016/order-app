# order-app

There are two project one is client and other is server.

Server side project is done based on microservices of Moleculer.

we will ge detail about it from here: https://moleculer.services/

I have used node version: v10.15.0 

### pre-requisite
- mongodb
- redis

#### for mongodb connection
we need to set the connection string on the following file
- db/MongooseConnector.js
we need to run both mongodb and redis server



How will we run the microservices
- cd server/
- npm install
- npm run start

How will we run the angular app (client)

in folder src/app/order-submitted/order-submitted.component.ts
 the default value of delay is set to 2 seconds. but we can change there. the name of the field is deliveredDuration
 

- cd client/
- npm install
- npm run start

### how to use
In client side, before create/open order we need to add new user. Add new user using username and password.
After that we can able to login using user name and password.



## toDO
i will add docker later






