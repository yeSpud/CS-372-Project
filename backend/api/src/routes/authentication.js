const { Login } = require("./schema/authentication")
const database = require("../../../database/index")
const { NotFound, TooManyRequests, Unauthorized } = require("http-errors")

const routes = async function(fastify) {

    fastify.post("/login", { schema: Login }, async request => {

        if (!await database.userInDatabase(request.body.username)) {
            throw new NotFound("That username does not exist. Please create an account.")
        }

        await database.removeOldLoginAttempts(request.body.username)

        const attempts = await database.getInvalidLoginAttempts(request.body.username)
        if (attempts.length >= 5) {
            throw new TooManyRequests("Account is locked due to too many failed login attempts.")
        }

        // TODO Make sure password matches regex!

        if (!await database.passwordMatches(request.body.username, request.body.password)) {
            await database.addInvalidLoginAttempt(request.body.username)
            throw new Unauthorized(`Incorrect password. ${5-(attempts.length+1)} attempts remaining.`)
        }

        const session = await database.setSessionCookie(request.body.username, request.cookies["sessionId"])

        //return `Username: ${request.body.username}, Password: ${request.body.password}`
        //return { user: "", session: ""}
        return { session: session }
    })

}

module.exports = { routes }