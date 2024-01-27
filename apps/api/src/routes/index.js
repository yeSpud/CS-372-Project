require("./authentication");

async function routes(fastify) {
    await fastify.register(authentication, { prefix: "/authentication" })
}

module.exports = { routes }