


import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req: NextRequest) {


    const { token } = await req.json();

    try {
        // Find the token in the database
        const verificationToken = await prisma.verificationToken.findUnique({
            where: { token }
        })

        if (!verificationToken || verificationToken.expires < new Date()) {
            return NextResponse.json({ error: 'Invalid or expired token!!' })
        }

        // mark the user as verified
        await prisma.user.update({
            where: { id: verificationToken.identifier },
            data: { emailVerified: new Date() }
        })

        // Delete the used Token
        await prisma.verificationToken.delete({
            where: { token }
        })

        return NextResponse.json({ success: true })
    } catch {
        return NextResponse.json({ error: 'Method Not allowed.' })
    }
}