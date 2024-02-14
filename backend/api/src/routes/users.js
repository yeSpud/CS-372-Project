const { User } = require("./schema/users")
const database = require("../../../database/index")
const { Unauthorized } = require("http-errors")

const routes = async function(fastify) {

    fastify.get("/@me", { schema: User.GET }, async request => {
        try {
            const username = await database.getUser(request.session.sessionId)
            return { username: username }
        } catch (e) {
            throw new Unauthorized("You need to be logged in first")
        }
    })

}

module.exports = { routes }