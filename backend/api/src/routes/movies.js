const { Movies } = require("./schema/movies")
const { Unauthorized } = require("http-errors")
const { prisma } = require("../../../database")
const routes = async function(fastify) {

    fastify.get("/", { schema: Movies.GET }, async request => {

        if (!request.isLoggedIn()) {
            throw new Unauthorized("You must be logged in to view movies")
        }

        return await prisma.movie.findMany()
    })

}

module.exports = { routes }