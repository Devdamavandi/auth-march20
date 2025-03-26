


import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)



export async function POST(request: NextRequest) {

    try {
        const { email, token } = await request.json()

        // Debug: Log the receiving data
        console.log('Sending verification email to: ', email)

        // Send verification email
        const data = await resend.emails.send({
            from: 'onboarding@resend.dev',
            to: email,
            subject: 'Verify Your Email',
            html: `<p>Click <a href="${process.env.NEXTAUTH_URL}/verify-email?token=${token}">here</a> to verify your email.</p>"`,
        })

        // Debug: Log successful send
        console.log('Email Sent Successfully: ', data)

        return NextResponse.json({ success: true })
    } catch (error) {
        // Log Detailed Error
        console.error('Resend API error: ', error)

        return NextResponse.json({ error: 'Failed to send Verification email.' }, { status: 500 })
    }
}