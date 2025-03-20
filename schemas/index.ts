

import * as z from 'zod'

export const RegisterSchema = z.object({
    name: z.string().min(1, { message: 'Name is reqired!!' }),
    email: z.string().email(),
    password: z.string().min(6, { message: 'Minimum 6 characters required!!' }),
    role: z.enum(['ADMIN', 'USER']).default('USER')
})


export const LoginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6, { message: 'Password id required!!' })
})