const Type = require("@sinclair/typebox")

const Movie = Type.Object({
    id: Type.String(),
    name: Type.String(),
    genre: Type.String(),
    comments: Type.Array(Type.String()),
    likes: Type.Number(),
    views: Type.Number(),
    fileLocation: Type.String()
})

const Movies = {
    GET: {
        querystring: Type.Object({
            name: Type.Optional(Type.String()),
            genre: Type.Optional(Type.String())
        }),
        response: { 200: Type.Array(Movie) }
    }
}

module.exports = { Movies }