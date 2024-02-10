const { Login } = require("./schema/authentication")
const database = require("../../../database/index")
const { NotFound, TooManyRequests, Unauthorized } = require("http-errors")

const routes = async function(fastify) {

    fastify.post("/login", { schema: Login }, async request => {

        await database.read()
        const user = database.data.find(u => u.username === request.body.username)

        if (user === undefined) {
            throw new NotFound("That username does not exist. Please create an account.")
        }

        for (const loginAttempt in user.loginAttempts) {
            // TODO If attempt is older than 24 hours remove it.
        }

        if (user.loginAttempts.loginAttempts >= 5) {
            throw new TooManyRequests("Account is locked due to too many failed login attempts")
        }

        if (user.password !== request.body.password) {
            throw new Unauthorized("Incorrect password")
        }

        // TODO Make a new session id in the database and return it

        //return `Username: ${request.body.username}, Password: ${request.body.password}`
        //return { user: "", session: ""}
        return { session: ""} // TODO return the session ID here as well as a cookie
    })

}

module.exports = { routes }