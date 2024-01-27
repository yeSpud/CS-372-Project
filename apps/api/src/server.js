const fastify = require("fastify");
const traps = require("@dnlup/fastify-traps");
const fastifyCookie = require("@fastify/cookie");
const fastifySession = require("@fastify/session");
const config = require("./config");
const routes = require("./routes");

async function build(opts = {}) {
    const server = fastify({ ...opts })

    // We want a graceful exit when receiving SIGINT, so add fastify traps
    await server.register(traps, { strict: false })

    // Add cookie and session support for session cookies
    await server.register(fastifyCookie)
    await server.register(fastifySession, {
        cookieName: "sessionId",
        cookie: { secure: config.env.NODE_ENV !== "development" },
        secret: "a secret with minimum length of 32 characters"
    })

    // Register our routes
    await server.register(routes.routes, {})

    return server
}

module.exports = { build }