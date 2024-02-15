const authentication = require("./authentication")
const users = require("./users")

async function routes(fastify) {
    await fastify.register(authentication.routes, { prefix: "/authentication" })
    await fastify.register(users.routes, { prefix: "/users" })
}

module.exports = routes