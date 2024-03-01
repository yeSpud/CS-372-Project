const { PrismaClient, AccountType } = require("@prisma/client")

/**
 * @constant
 * @type {PrismaClient}
 * @default
 */
const prisma = new PrismaClient()

module.exports = { prisma, AccountType }
