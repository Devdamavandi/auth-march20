
'use server'

import { signIn } from "@/auth";
import { getUserByEmail } from "@/data/userQueries";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { LoginSchema } from "@/schemas";
import bcrypt from "bcryptjs";
import { AuthError } from "next-auth";
import { z } from "zod";

export const login = async (values: z.infer<typeof LoginSchema>) => {

    const validatedFields = LoginSchema.safeParse(values)
    if (!validatedFields.success) {
        return { error: 'Invalid Credentials!!' }
    }

    const { email, password } = validatedFields.data


    const existingUser = await getUserByEmail(email)
    if (!existingUser || !existingUser.email) {
        return { error: 'Email does not exist!!' }
    }

    // if the user exists but doesnt have a password, they've signed up via OAuth
    if (!existingUser.password) {
        return { error: 'This Email is associated with a social login. Please use Google or Github to log in.' }
    }

    if (!existingUser.emailVerified) {
        return { error: 'Your email is not verified yet! Check your inbox for the verification link.' }
    }

    // Validate the password
    const passwordsMatch = await bcrypt.compare(password, existingUser.password)
    if (!passwordsMatch) {
        return { error: "Invalid credentials!!" }
    }

    // Attempt to signin
    try {
        const result = await signIn("credentials", {
            email,
            password,
            redirect: false,
        })

        // Check if the sign-in was successful
        if (result?.error) {
            return { error: result.error }
        }
        // Return success with the redirect URL
        console.log('Login Successful')
        return { success: true }
    } catch (error) {
        console.log('Login error: ', error)
        if (error instanceof AuthError) {
            switch (error.type) {
                case "CredentialsSignin":
                    return { error: 'Invalid credentials!!' }
                default:
                    return { error: 'Something went wrong!!' }
            }
        }
        throw error
    }
}