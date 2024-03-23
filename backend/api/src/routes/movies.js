const { Movies, Movie } = require("./schema/movies")
const { BadRequest, Unauthorized, Forbidden, NotFound, Conflict } = require("http-errors")
const { prisma, PrismaClientKnownRequestError } = require("../../../database")
const routes = async function(fastify) {

    fastify.get("/", { schema: Movies.GET }, async request => {

        if (!request.isLoggedIn()) {
            throw new Unauthorized("You must be logged in to view movies")
        }

        let filters = await request.isViewer() ? { shown: true } : {}
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

        // Make sure the IDs are in a valid format
        request.body.movieIDs.forEach(id => {
            if (!id.match(/^[a-f\d]{24}$/i)) {
                throw new BadRequest(`Id does not match format: ${id}`)
            }
        })

        // Instead of removing them from the database just set the shown boolean to false
        // TODO Catch 404s
        await prisma.movie.updateMany({
            where: { id: { in: [...request.body.movieIDs] } },
            data: { shown: false }
        })

        reply.code(204)
    })
  
    fastify.patch("/:id", { schema: Movie.PATCH }, async request => {

        if (!request.isLoggedIn()) {
            throw new Unauthorized("You must be logged in to edit movie details")
        }

        // Only the marketing manager is allowed to leave comments,
        // whereas the content editor is allowed to edit everything else (except comments)
        if (request.body.comments !== undefined && !(await request.isMarketingManager())) {
            throw new Forbidden("Only marketing managers are allowed to leave comments")
        }

        if ((request.body.name !== undefined || request.body.genre !== undefined || request.body.movieLocation !== undefined
            || request.body.shown !== undefined) && !(await request.isContentEditor())) {
            throw new Forbidden("Only content editors are allowed to edit movie details")
        }

        try {
            return await prisma.movie.update({
                where: { id: request.params.id },
                data: request.body
            })
        } catch (e) {
            if (e instanceof PrismaClientKnownRequestError && e.code === "P2002") {
                throw new Conflict("A movie with that url has already been added!")
            }
            throw e
        }
    })
}

module.exports = { routes }