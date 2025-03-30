// Add singleton pattern to prevent multiple Prisma instances

import { PrismaClient } from '@prisma/client';

// PrismaClient is attached to the `global` object in development to prevent
// exhausting your database connection limit.
//
// Learn more:
// https://pris.ly/d/help/next-js-best-practices

const globalForPrisma = global as unknown as { prisma: PrismaClient };

// Check if we are in production
const isProd = process.env.NODE_ENV === 'production';

// Instantiate PrismaClient with additional logging in development
const prismaClientSingleton = () => {
  return new PrismaClient({
    log: isProd ? [] : ['query', 'error', 'warn'],
  });
};

const prisma = globalForPrisma.prisma || prismaClientSingleton();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

export default prisma;
