const bodySchema = {
    type: "object",
    properties: {
        username: { type: "string" },
        password: { type: "string" }
    },
    required: [ "username", "password" ]
}

const responseSchema = {
    type: "string"
}

const routes = async function(fastify) {

    fastify.post("/login", {
        schema: {
            body: bodySchema,
            response: { 200: responseSchema }
        }
    }, async request => {
        return `Username: ${request.body.username}, Password: ${request.body.password}`
    })

}

module.exports = { routes }