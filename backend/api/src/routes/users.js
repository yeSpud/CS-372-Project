const { User } = require("./schema/users")
// const database = require("../../../database/index")
const { Unauthorized } = require("http-errors")

const routes = async function(fastify) {

    fastify.get("/@me", { schema: User.GET }, async request => {
        //try {

        //const username = await database.getUser(request.session.sessionId)

        //} catch (e) {
        if (request.session.username == null) {
            //if (e.message === "User does not exist in database") {
            throw new Unauthorized("You need to be logged in first")
        }
        return { username: request.session.username }
        //}
    })

}

module.exports = { routes }