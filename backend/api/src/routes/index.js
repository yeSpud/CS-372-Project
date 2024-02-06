const authentication = require("./authentication")

async function routes(fastify) {
    await fastify.register(authentication.routes, { prefix: "/authentication" })
}

module.exports = { routes }