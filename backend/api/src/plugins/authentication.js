const fp = require("fastify-plugin")
const { prisma, AccountType } = require("../../../database")

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

})