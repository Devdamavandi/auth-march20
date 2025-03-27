import NextAuth from 'next-auth'
import { authConfig } from './auth.config'
import { PrismaAdapter } from '@auth/prisma-adapter'
import { prisma } from '@/lib/prisma'
import { getUserById } from './data/userQueries'

declare module "next-auth" {
    interface User {
        role?: string
    }
}

export const { auth, handlers, signIn, signOut } = NextAuth({

    pages: {
        signIn: '/auth/login',
        error: '/auth/error',
    },
    // This is for seperating the OAuth login and credentials because OAuth doesnr need email verified
    events: {
        async linkAccount({ user }) {
            await prisma.user.update({
                where: { id: user.id },
                data: { emailVerified: new Date() }
            })
        }
    },
    callbacks: {
        async signIn({ user, account }) {

            if (account?.provider !== 'credentials') return true

            if (!user.id) return false

            const existingUser = await getUserById(user.id)
            return !!existingUser?.emailVerified // return everything that this line returns

        },
        async session({ token, session }) {
            if (token.sub && session.user) {
                session.user.id = token.sub
            }

            if (token.role && session.user) {
                session.user.role = token.role as string
            }
            return session
        },
        async jwt({ token }) {
            if (!token.sub) return token

            const existingUser = await getUserById(token.sub)
            if (!existingUser) return token

            token.role = existingUser.role

            return token
        },
        authorized({ auth }) {
            return !!auth?.user
        },
    },
    adapter: PrismaAdapter(prisma),
    session: { strategy: "jwt" },
    debug: process.env.NODE_ENV === 'development',
    secret: process.env.NEXTAUTH_SECRET,
    ...authConfig,
})