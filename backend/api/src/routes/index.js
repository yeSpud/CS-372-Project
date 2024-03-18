// adds prefixes to all authentication and user routes

const authentication = require("./authentication")
const users = require("./users")
const movies = require("./movies")

async function routes(fastify) {
    await fastify.register(authentication.routes, { prefix: "/authentication" })
    await fastify.register(users.routes, { prefix: "/users" })
    await fastify.register(movies.routes, { prefix: "/movies" })
}

module.exports = routes