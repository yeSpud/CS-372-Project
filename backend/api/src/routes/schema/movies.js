const Type = require("@sinclair/typebox")

const Movie = Type.Object({

})

const Movies = {
    GET: {
        querystring: Type.Object({
            name: Type.Optional(Type.String()),
            genre: Type.Optional(Type.String())
        }),
        response: { 200: Movie }
    }
}

module.exports = { Movies }