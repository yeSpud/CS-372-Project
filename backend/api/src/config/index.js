const env = {
    HTTP_HOST: "0.0.0.0",
    HTTP_PORT: "8080",
    HTTP_TRUST_PROXY: "false",
    NODE_ENV: "development",
    CORS_URL: "http://localhost:5173",
    SECRET: "a secret with minimum length of 32 characters",
    BASE_FRONTEND_URL: "http://localhost:5173/"
}

module.exports = { env }