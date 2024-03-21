const Type = require("@sinclair/typebox")

const MovieType = Type.Object({
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
        response: { 200: Type.Array(Type.Omit(MovieType, ["comments", "movieLocation", "views", "shown", "likes"])) }
    },
    DELETE: {
        body: Type.Object({
            movieIDs: Type.Array(Type.String())
        }),
        response: { 204: Type.Null() }
    }
}

const Movie = {
    GET: {
        params: Type.Object({ id: Type.String() }),
        response: { 200: MovieType }
    },
    POST: {
        body: Type.Object({
            name: Type.String(),
            genre: Type.String(),
            movieLocation: Type.String()
        }),
        response: { 201: MovieType }
    },
    PATCH: {
        params: Type.Object({ id: Type.String() }),
        body: Type.Object({
            name: Type.Optional(Type.String()),
            genre: Type.Optional(Type.String()),
            comments: Type.Optional(Type.Array(Type.String())),
            movieLocation: Type.Optional(Type.String()),
            shown: Type.Optional(Type.Boolean())
        }),
        response: { 200: MovieType }
    }
}

module.exports = { Movies, Movie }