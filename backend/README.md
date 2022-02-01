<div align="center">
<h1>e-commerce: backend</h1>

</div>

## BeforeHand
This application is meant to run on linux, you need to have docker and pgadmin4 installed on your machine

## Instalation

Please make two copies of the `.env.example` following the instructions in it and name them `.env.dev` and `.env.test` respectivaly. Example:

```
# .env.test
PORT=3001

DB_USER=user_0001
DB_PASS=asdjasdopasjdasopdjasdj
DB_NAME=DATABASE
DB_TEST_NAME=test

DB_HOST=localhost
DB_PORT=5433
...
```

```
# .env.dev
PORT=3001

DB_USER=user_0001
DB_PASS=asdjasdopasjdasopdjasdj
DB_NAME=DATABASE
DB_TEST_NAME=test

DB_HOST=localhost
DB_PORT=5433
...
```

After that, install the project dependencies

```bash
$ yarn install
```

## Running the application
First things first you need to get the docker running, use the following command
```bash
$ yarn dc:up

```
With the docker ok, you're ready to start the application
```bash
# development
$ yarn start:dev
```

## Running tests
To run the tests we also need the docker running, use the following command
```bash
$ yarn dc:up

```
With the docker ready, then you run the tests
```bash
# all tests
yarn test

# unit tests
$ yarn test:unit

# e2e tests
$ yarn test:e2e

```
