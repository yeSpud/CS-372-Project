const fp = require("fastify-plugin")

module.exports = fp(async function(fastify) {

    // Add a helper function to check if the session is a logged-in user
    fastify.decorateRequest("isLoggedIn", function() {
        return this.session.userId != null
    })

})