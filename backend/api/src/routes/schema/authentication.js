const Type = require("@sinclair/typebox")

const Login = {
    body: Type.Object({
        username: Type.String(),
        password: Type.String()
    }),
    response: {
        "200": Type.Object({
            user: Type.String(),
            session: Type.String()
        })
    }
}

module.exports = { Login }