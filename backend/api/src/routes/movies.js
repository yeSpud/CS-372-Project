const { Movies } = require("./schema/movies")
const { Unauthorized } = require("http-errors")
const { prisma } = require("../../../database")
const routes = async function(fastify) {

    fastify.get("/", { schema: Movies.GET }, async request => {

        if (!request.isLoggedIn()) {
            throw new Unauthorized("You must be logged in to view movies")
        }

        const filters = {}
        for (const key of Object.keys(request.query)) {
            filters[key] = {
                contains: request.query[key],
                mode: "insensitive"
            }
        }

        return await prisma.movie.findMany({ where: filters })
    })

}

module.exports = { routes }