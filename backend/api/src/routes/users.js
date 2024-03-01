// define fastify route: User.GET, retrieve user info or throw if not logged in

const { User } = require("./schema/users")
const { Unauthorized } = require("http-errors")
const { prisma } = require("../../../database")

const routes = async function(fastify) {

    fastify.get("/@me", { schema: User.GET }, async request => {

        if (!request.isLoggedIn()) {
            throw new Unauthorized("You need to be logged in first")
        }

        return await prisma.user.find({
            where: { id: request.session.userId },
            include: {
                loginAttempts: false,
                password: false
            }
        })
    })

}

module.exports = { routes }