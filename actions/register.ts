

'use server'

import { RegisterSchema } from "@/schemas"
import { z } from "zod"
import bcrypt from "bcryptjs"
import { getUserByEmail } from "@/data/userQueries"
import { prisma } from '@/lib/prisma'


export const register = async (values: z.infer<typeof RegisterSchema>) => {

    try {
        const validatedFields = RegisterSchema.safeParse(values)
        if (!validatedFields.success) {
            return { error: 'Invalid Fields!!' }
        }

        const { name, email, password, role } = validatedFields.data

        const existingUser = await getUserByEmail(email)
        if (existingUser) {
            return { error: 'Email already Exists!!' }
        }


        const hashedPassword = await bcrypt.hash(password, 12)

        await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
                role
            }
        })

        return { success: 'User registered Successfully!' }
    } catch (error) {
        console.error('Error Occured: ', error)
    }
}