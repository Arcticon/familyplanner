// src/server/db/client.ts
import { PrismaClient } from '@prisma/client';
import { env } from '../env';

declare global {
    var prisma: PrismaClient | undefined;
}

export const prisma = global.prisma || new PrismaClient({});

if (env.NODE_ENV !== 'production') {
    global.prisma = prisma;
}
