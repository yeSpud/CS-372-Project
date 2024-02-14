const { User } = require("./schema/users")
const { Unauthorized } = require("http-errors")

const routes = async function(fastify) {

    fastify.get("/@me", { schema: User.GET }, async request => {
        if (request.session.username == null) {
            throw new Unauthorized("You need to be logged in first")
        }
        return { username: request.session.username }
    })

}

module.exports = { routes }