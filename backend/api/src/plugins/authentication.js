const fp = require("fastify-plugin")
const { prisma, AccountType } = require("../../../database")
const { BadRequest } = require("http-errors")

module.exports = fp(async function(fastify) {

    // Add a helper function to check if the session is a logged-in user
    fastify.decorateRequest("isLoggedIn", function() {
        return this.session.userId != null
    })

    fastify.decorateRequest("isViewer", async function() {
        if (!this.isLoggedIn) {
            return false
        }

        const user = await prisma.user.findUnique({ where: { id : this.session.userId }})
        if (user !== null) {
            return user.accountType === AccountType.VIEWER
        }
        return false
    })

    fastify.decorateRequest("isContentEditor", async function() {
        if (!this.isLoggedIn) {
            return false
        }

        const user = await prisma.user.findUnique({ where: { id : this.session.userId }})
        if (user !== null) {
            return user.accountType === AccountType.CONTENT_EDITOR
        }
        return false
    })

    fastify.decorateRequest("isMarketingManager", async function() {
        if (!this.isLoggedIn) {
            return false
        }

        const user = await prisma.user.findUnique({ where: { id : this.session.userId }})
        if (user !== null) {
            return user.accountType === AccountType.MARKETING_MANAGER
        }
        return false
    })

    // Add a hook to check if the request's ID param matches the ID format
    fastify.addHook("preHandler", (request, reply, done) => {
        if (request.params !== undefined && Object.prototype.hasOwnProperty.call(request.params, "id")) {

            // Check if the ID matches mongoDB ObjectID format
            if (!request.params.id.match(/^[a-f\d]{24}$/i)) {
                throw new BadRequest("id does match format")
            }
        }
        done()
    })

})