import { PrismaClient } from '@prisma/client'

// declare global{
//     var prisma: PrismaClient
// }

// if(process.env.NODE_ENV === 'production') {
//     prisma = new PrismaClient();
// }else{
//     if (!global.prisma) {
//         global.prisma = new PrismaClient();
//     }
//     prisma = global.prisma;
// }

// export default prisma


const globalForPrisma = globalThis as unknown as {
    prisma: PrismaClient | undefined
}

export const prisma = globalForPrisma.prisma ?? new PrismaClient()
if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma 