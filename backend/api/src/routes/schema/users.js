const Type = require("@sinclair/typebox")

const User = {
    GET: {
        response: {
            "200": Type.Object({
                username: Type.String()
            })
        }
    }
}

module.exports = { User }