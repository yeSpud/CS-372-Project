const { PrismaClient, AccountType, PrismaClientKnownRequestError } = require("@prisma/client")

/**
 * @constant
 * @type {PrismaClient}
 * @default
 */
const prisma = new PrismaClient()

module.exports = { prisma, AccountType, PrismaClientKnownRequestError }
