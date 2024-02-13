const Type = require("@sinclair/typebox")

const Login = {
    body: Type.Object({
        username: Type.String(),
        password: Type.String()
    }),
    response: {
        "200": Type.Object({
            session: Type.String()
        })
    }
}

module.exports = { Login }