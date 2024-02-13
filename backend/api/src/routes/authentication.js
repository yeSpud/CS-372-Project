const { Login } = require("./schema/authentication")
const database = require("../../../database/index")
const { NotFound, TooManyRequests, Unauthorized } = require("http-errors")
const crypto = require("crypto")
const config = require("../config")

const routes = async function(fastify) {

    fastify.post("/login", { schema: Login }, async (request, response) => {

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

        // FIXME Figure out how to require cookies be sent and returned PROPERLY
        let cookie = request.cookies["sessionId"]
        if (cookie === undefined) {

            // I am aware that this is a TERRIBLE way to generate session IDs, but it'll do for now...
            cookie = crypto.createHash("sha256").update(request.body.username + new Date().getTime() + Math.random()).digest("base64")
            response.setCookie("sessionId", cookie)
        }
        const session = await database.setSessionCookie(request.body.username, cookie)

        return { session: session }
    })

}

module.exports = { routes }