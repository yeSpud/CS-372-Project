// define login check funtions, fastify route handling: login, signup, signout

// npm install crypto
const crypto = require("crypto")

const { Login, Signup, Signout } = require("./schema/authentication")
const { prisma, AccountType } = require("../../../database")
const { NotFound, TooManyRequests, Unauthorized, BadRequest, Conflict } = require("http-errors")
const {env} = require("../config")

// glorious password encryption function that will totally work first try
function encryptDaPassword(password) {
    return crypto.createHash("sha256").update(password).digest("base64")
}

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

        let user = await prisma.user.findUnique({ where: { username: request.body.username } })
        if (user === null) {
            throw new NotFound("That username does not exist. Please create an account.")
        }

        const cutoffDate = new Date().getTime() - (24 * 60 * 60 * 1000)
        user = await prisma.user.update({
            where: { id: user.id },
            data: { loginAttempts: user.loginAttempts.filter(date => (date.getTime() > cutoffDate)) }
        })

        const attempts = user.loginAttempts.length
        if (attempts >= 5) {
            throw new TooManyRequests("Account is locked due to too many failed login attempts.")
        }
        
        passwordCheck(request.body.password)

        if (user.password !== encryptDaPassword(request.body.password)) { // encrypt to check with encrypted password
            await prisma.user.update({
                where: { id: user.id },
                data: { loginAttempts: { push: new Date() } }
            })
            throw new Unauthorized(`Incorrect password. ${5-(attempts+1)} attempts remaining.`)
        }

        request.session.userId = user.id
    })

    fastify.post("/signup", { schema: Signup }, async (request, response) => {
        usernameCheck(request.body.username)
        passwordCheck(request.body.password)

        if (await prisma.user.findUnique({where: { username: request.body.username }}) !== null) {
            throw new Conflict("That username is already in use, please choose another.")
        }
        // encrypt before saving password to database
        const encryptedPassword = encryptDaPassword(request.body.password)
        await prisma.user.create({ data: {
            username: request.body.username,
            password: encryptedPassword,
            accountType: AccountType.VIEWER,
            loginAttempts: []
        }})
        response.code(201)
    })

    fastify.get("/signout", { schema: Signout }, async (request, response) => {
        request.session.destroy()
        response.redirect(302, env.CORS_URL + "/login")
    })
}

module.exports = { routes }