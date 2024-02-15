const fastify = require("fastify")
const traps = require("@dnlup/fastify-traps")
const fastifyCookie = require("@fastify/cookie")
const fastifySession = require("@fastify/session")
const fastifyCors = require("@fastify/cors")
const config = require("./config")
const routes = require("./routes")

async function build(opts = {}) {
    const server = fastify({ ...opts })

    // We want a graceful exit when receiving SIGINT, so add fastify traps
    await server.register(traps, { strict: false })

    // Add cookie and session support for session cookies
    await server.register(fastifyCookie)
    await server.register(fastifySession, {
        cookieName: "sessionId",
        cookie: { secure: config.env.NODE_ENV !== "development" },
        secret: config.env.SECRET
    })

    // For this simple project we are going to disable cors
    await server.register(fastifyCors, {
        origin: config.env.CORS_URL,
        credentials: true
    })

    // Register our routes
    await server.register(routes, {})

    return server
}

module.exports = { build }