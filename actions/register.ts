

'use server'

import { RegisterSchema } from "@/schemas"
import { z } from "zod"
import bcrypt from "bcryptjs"
import { getUserByEmail } from "@/data/userQueries"
import { prisma } from '@/lib/prisma'
import { v4 as uuidv4 } from 'uuid'


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

        // Create the user
        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
                role
            }
        })

        // Generate verification token
        const token = uuidv4()
        await prisma.verificationToken.create({
            data: {
                identifier: user.id,
                token,
                expires: new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hours
            }
        })


        // Generate verification email Sending
        const emailResponse = await fetch(`${process.env.NEXTAUTH_URL}/api/verify-email-sending`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: user.email, token })
        })

        // Proper error handling
        if (!emailResponse.ok) {
            const errorText = await emailResponse.json()
            console.error('Email API Error: ', errorText)
            throw new Error(errorText.error || 'Failed to send verification email.')
        }

        return { success: 'User registered Successfully! Check Your Email to verify.' }
    } catch (error) {
        console.error('Email sending failed: ', error)
        return { error: 'Something went wrong' }
    }
}