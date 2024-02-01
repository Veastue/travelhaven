import { PrismaClient } from "@prisma/client";


//we declare prisma a global definition
declare global {
    var prisma: PrismaClient | undefined
}

//client variable sthat searches global prisma or create 'new' PrismaClient everytime
const client =  globalThis.prisma || new PrismaClient()
if (process.env.NODE_ENV === 'production') globalThis.prisma = client;



export default client;

