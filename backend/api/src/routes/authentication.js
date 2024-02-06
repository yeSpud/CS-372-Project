const { BadRequest } = require("http-errors")
const { Login } = require("./schema/authentication")

const routes = async function(fastify) {

    fastify.post("/login", { schema: { Login } }, async request => {

        if (request.body.username === undefined) {
            throw new BadRequest("Username cannot be undefined")
        }

        if (request.body.password === undefined) {
            throw new BadRequest("Password cannot be undefined")
        }

        return `Username: ${request.body.username}, Password: ${request.body.password}`
    })

}

module.exports = { routes }