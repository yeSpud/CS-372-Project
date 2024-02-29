# CS-372-Project
Web video player

## Looking for what to do?
Check the [Projects](https://github.com/yeSpud/CS-372-Project/projects) tab

## Used technologies
* MongoDB: Database
* Node JS: JS Runtime
* PNPM: Package management
* Vue: Used for frontend
* FormKit: Used for forms on the frontend
* Fastify: Used for API backend
* ESLint: Used for linting and build checks
* Prisma: Used for interfacing with database
* Typebox: Used for api schema
* Docker: Used for containerizing

## Potential technologies
* Mocha: For unit testing

## Getting started
Once you clone the repository install [pnpm](https://pnpm.io/installation) and run `pnpm i`.

To setup the database environment variables create a new `.env` file in `backend/database` with `DATABASE_URL` as a key followed by the mongodb url.

See the `example.env` file as an example `.env` file.

## Running

### Backend
Start the docker container by running `docker compose up -d` in the root project directory.

Next `cd` into the `database` directory in `backend/database` and run `pnpm prisma generate` to create the database interface.

To start the backend `cd` into the `api` directory in `backend/api` and run `node src/index.js`

### Frontend

To build and run the frontend `cd` into the `frontend` directory and run `pnpm dev`

### Requirement Gathering Priority List

https://docs.google.com/document/d/1_UdpOFp0e80m-MXqDnSQkbh0jRoYqSOsT3qcSMhkk0s/edit?usp=sharing