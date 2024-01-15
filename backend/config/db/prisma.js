const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
// Hier in dit prisma object zitten al mijn klasses

module.exports = prisma;
