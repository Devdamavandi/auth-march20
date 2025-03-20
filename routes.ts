



export const DEFAULT_LOGIN_REDIRECT = "/dashboard"


export const publicRoutes: string[] = [
    '/',
    '/auth/new-verification'
]

export const ProtectedRoutes: string[] = [
    '/dashboard'
]


export const authRoutes: string[] = [
    '/auth/login',
    '/auth/register',
    '/auth/error'
]

export const apiAuthPrefix: string = '/api/auth'