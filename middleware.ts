


import { NextResponse } from "next/server"
import { apiAuthPrefix, authRoutes, DEFAULT_LOGIN_REDIRECT, ProtectedRoutes, publicRoutes } from "./routes"
import { NextRequest } from "next/server";

export default function middleware(req: NextRequest): NextResponse | null {

    const { pathname } = req.nextUrl

    // Check if the user is logegd in
    const token = req.cookies.get("authjs.session-token")?.value
    const isLoggedIn = !!token


    // Check route types
    const isApiAuthRoute = pathname.startsWith(apiAuthPrefix)
    const isAuthRoute = authRoutes.includes(pathname)
    const isPublicRoute = publicRoutes.includes(pathname)
    const isProtectedRoute = ProtectedRoutes.includes(pathname)

    // Allow API auth routes to proceed
    if (isApiAuthRoute) return null

    // Redirect logged-in users away from auth routes (e.g. login/register)
    if (isAuthRoute) {
        if (isLoggedIn) {
            return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, req.nextUrl))
        }
        return null
    }

    // Redirect non-logged-in users away from protected routes
    if (isProtectedRoute && !isLoggedIn) {
        return NextResponse.redirect(new URL('/auth/login', req.nextUrl))
    }

    // Allow public routes to proceed
    if (isPublicRoute) return null

    return null
}




export const config = {
    matcher: [
        // Match all routes except:
        // - _next/static (static files)
        // - _next/image (image optimization files)
        // - favicon.ico (favicon file)
        // - public folder (static assets)
        // - API routes (trpc, auth, etc.)
        "/((?!_next/static|_next/image|favicon.ico|api|trpc).*)",
    ],
};