const { Movies, Movie } = require("./schema/movies")
const { Unauthorized, Forbidden } = require("http-errors")
const { prisma } = require("../../../database")
const routes = async function(fastify) {

    fastify.get("/", { schema: Movies.GET }, async request => {

        if (!request.isLoggedIn()) {
            throw new Unauthorized("You must be logged in to view movies")
        }

        let filters = {}
        for (const key of Object.keys(request.query)) {
            filters[key] = {
                contains: request.query[key],
                mode: "insensitive"
            }
        }

        return await prisma.movie.findMany({ where: filters })
    })

    fastify.get("/:id", { schema: Movie.GET }, async request => {
        if (!request.isLoggedIn()) {
            throw new Unauthorized("You must be logged in to view movie details")
        }

        if (await request.isViewer()) {
            throw new Forbidden("You must be a marketing manager or content editor to view movie details")
        }

        return await prisma.movie.findUnique({where: { id: request.params.id }})
    })

}

module.exports = { routes }