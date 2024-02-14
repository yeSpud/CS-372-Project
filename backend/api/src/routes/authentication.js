const { Login } = require("./schema/authentication")
const database = require("../../../database/index")
const { NotFound, TooManyRequests, Unauthorized, BadRequest } = require("http-errors")

// 4 character long minimum username only small letters, must have 1 underscore as only special character
function usernameCheck(username) {
    if (username.length < 4) {
        throw new BadRequest("Username must be at least 4 characters")
    }

    if (username !== username.toLowerCase()) {
        throw new BadRequest("Username must be all lowercase")
    }

    if (username.split("_").length - 1 >= 2) {
        throw new BadRequest("Only up to 1 underscore (_) allowed in username")
    }
}

// Password should contain 8 characters, 1 capital, 1 small letter, 1 number, 1 special char, dot is not a special character
function passwordCheck(password) {
    if (password.length < 8) {
        throw new BadRequest("Password must be at least 8 characters!")
    }

    const capitalCheck = RegExp("[A-Z]")
    if (!capitalCheck.test(password)) {
        throw new BadRequest("Password must contain at least 1 capital letter")
    }

    const lowercaseCheck = RegExp("[a-z]")
    if (!lowercaseCheck.test(password)) {
        throw new BadRequest("Password must contain at least 1 lowercase letter")
    }

    const numberCheck = RegExp("\\d")
    if (!numberCheck.test(password)) {
        throw new BadRequest("Password must contain at least 1 number")
    }

    const specialCharacterCheck = RegExp("[^a-zA-Z0-9\\s.]")
    if (!specialCharacterCheck.test(password)) {
        throw new BadRequest("Password must contain at least 1 special character not including dot (.)")
    }
}

const routes = async function(fastify) {

    fastify.post("/login", { schema: Login }, async request => {

        usernameCheck(request.body.username)

        if (!await database.userInDatabase(request.body.username)) {
            throw new NotFound("That username does not exist. Please create an account.")
        }

        await database.removeOldLoginAttempts(request.body.username)

        const attempts = await database.getInvalidLoginAttempts(request.body.username)
        if (attempts.length >= 5) {
            throw new TooManyRequests("Account is locked due to too many failed login attempts.")
        }

        passwordCheck(request.body.password)

        if (!await database.passwordMatches(request.body.username, request.body.password)) {
            await database.addInvalidLoginAttempt(request.body.username)
            throw new Unauthorized(`Incorrect password. ${5-(attempts.length+1)} attempts remaining.`)
        }

        //const session = await database.setSessionCookie(request.body.username, null)
        request.session.username = request.body.username

        return { session: "" }
    })

}

module.exports = { routes }