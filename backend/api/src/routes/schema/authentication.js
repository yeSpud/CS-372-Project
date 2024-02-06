const Type = require("@sinclair/typebox")

const Login = Type.Object({
    body: Type.Object({
        username: Type.String(),
        password: Type.String()
    }),
    response: Type.Object({ 200: Type.String() })
})

module.exports = { Login }