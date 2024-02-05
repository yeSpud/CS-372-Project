const Login = {
    body: {
        type: "object",
        properties: {
            username: { type: "string" },
            password: { type: "string" }
        },
        required: [ "username", "password" ]
    },
    response: { 200: { type: "string" } }
}

module.exports = { Login }