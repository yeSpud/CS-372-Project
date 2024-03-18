const Type = require("@sinclair/typebox")

const Movie = Type.Object({
    id: Type.String(),
    name: Type.String(),
    genre: Type.String(),
    comments: Type.Array(Type.String()),
    movieLocation: Type.String(),
    views: Type.Number(),
    shown: Type.Boolean(),
    likes: Type.Array(Type.String())
})

const Movies = {
    GET: {
        querystring: Type.Object({
            name: Type.Optional(Type.String()),
            genre: Type.Optional(Type.String())
        }),
        response: { 200: Type.Array(Type.Omit(Movie, ["comments", "movieLocation", "views", "shown", "likes"])) }
    }
}

module.exports = { Movies }