import { PrismaClient } from "@prisma/client"

const db = new PrismaClient()

// Context type declaration
export type Context = {
    db: PrismaClient
}

// Context instance
export const context: Context = {
    db
}