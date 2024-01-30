const server = require("./server");
const config = require("./config");

(async () => {
    const webserver = await server.build({
        logger: { level: "info" },
        /*trustProxy: config.env.HTTP_TRUST_PROXY*/
    })

    webserver.listen({
        host: config.env.HTTP_HOST,
        port: config.env.HTTP_PORT
    }, (error, address) => {
        if (error !== null) {
            webserver.log.error(error)
            process.exit(1)
        }
        webserver.log.info(`Listening on ${address}}`)
    })
})()