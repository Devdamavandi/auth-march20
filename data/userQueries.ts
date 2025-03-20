
import { prisma } from '@/lib/prisma'


export const getUserByEmail = async (email: string) => {
    try {
        const foundUser = await prisma.user.findFirst({
            where: {
                email
            }
        })
        return foundUser
    } catch {
        return null
    }
}


export const getUserById = async (id: string) => {
    try {
        const foundUserId = await prisma.user.findUnique({
            where: { id }
        })
        return foundUserId
    } catch {
        return null
    }
}