// define fastify route: User.GET, retrieve user info or throw if not logged in

const { User } = require("./schema/users")
const { Unauthorized } = require("http-errors")
const { prisma } = require("../../../database")

const routes = async function(fastify) {

    fastify.get("/@me", { schema: User.GET }, async request => {
        if (!request.isLoggedIn()) {
            throw new Unauthorized("You need to be logged in first")
        }

        const user = await prisma.user.findUnique({ where: { id: request.session.userId }})
        return {
            id: user.id,
            username: user.username,
            accountType: user.accountType
        }
    })

}

module.exports = { routes }