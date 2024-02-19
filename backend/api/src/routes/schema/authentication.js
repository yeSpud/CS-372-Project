// define json schemas: Login, Signup, Signout

const Type = require("@sinclair/typebox")

const Login = {
    body: Type.Object({
        username: Type.String(),
        password: Type.String()
    }),
    response: { "200": Type.Null() }
}

const Signup = { 
    body: Type.Object({
        username: Type.String(),
        password: Type.String()
    }),
    response: { "201": Type.Null() }
}

const Signout = {
    response: { "302": Type.Null() }
}

module.exports = { Login, Signup, Signout }