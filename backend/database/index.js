const { PrismaClient, AccountType } = require("@prisma/client")
const prisma = new PrismaClient()

module.exports = { prisma, AccountType }
