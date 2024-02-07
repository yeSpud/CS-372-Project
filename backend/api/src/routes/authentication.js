const { Login } = require("./schema/authentication")

const routes = async function(fastify) {

    fastify.post("/login", { schema: Login }, async request => {

        return `Username: ${request.body.username}, Password: ${request.body.password}`
        //return { user: "", session: ""}
    })

}

module.exports = { routes }