const { Movies, Movie } = require("./schema/movies")
const { Unauthorized, Forbidden, NotFound, Conflict } = require("http-errors")
const { prisma, PrismaClientKnownRequestError } = require("../../../database")
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

        const movie = await prisma.movie.findUnique({ where: { id: request.params.id } })
        if (movie === null) {
            throw new NotFound("That movie was not found")
        }
        return movie
    })

    fastify.post("/", { schema: Movie.POST }, async (request, reply) => {

        if (!request.isLoggedIn()) {
            throw new Unauthorized("You must be logged in to view movie details")
        }

        if (await !request.isContentEditor()) {
            throw new Forbidden("You must be a content editor to add a movie")
        }

        try {
            reply.code(201)
            return await prisma.movie.create({ data: request.body })
        } catch (e) {
            if (e instanceof PrismaClientKnownRequestError && e.code === "P2002") {
                throw new Conflict("That movie has already been added!")
            }
            throw e
        }
    })

    fastify.delete("/", { schema: Movies.DELETE }, async (request, reply) => {

        if (!request.isContentEditor()) {
            throw new Unauthorized("You must be a content editor to remove movies")
        }

        // Instead of removing them from the database just set the shown boolean to false
        await prisma.movie.updateMany({
            where: { id: { in: [...request.body.movieIDs] } },
            data: { shown: false }
        })

        reply.code(204)
    })
}

module.exports = { routes }