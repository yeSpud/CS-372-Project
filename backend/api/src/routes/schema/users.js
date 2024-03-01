//define json schema: user

const Type = require("@sinclair/typebox")

const AccountType = Type.Union([
    Type.Literal("VIEWER"),
    Type.Literal("CONTENT_EDITOR"),
    Type.Literal("MARKETING_MANAGER")
])

const UserType = Type.Object({
    id: Type.String(),
    username: Type.String(),
    accountType: AccountType
})

const User = {
    GET: {
        response: {
            200: UserType
        }
    }
}

module.exports = { User, UserType }