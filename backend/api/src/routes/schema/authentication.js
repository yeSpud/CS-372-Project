const Type = require("@sinclair/typebox")

const Login = {
    body: Type.Object({
        username: Type.String(),
        password: Type.String()
    }),
    response: {
        "301": Type.Object({
            Location: Type.String()
        })
    }
}

module.exports = { Login }