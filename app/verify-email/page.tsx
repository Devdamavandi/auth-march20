
'use client'

import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"



const EmailVerifiedPage = () => {

    const router = useRouter()
    const searchParams = useSearchParams()
    const [message, setMessage] = useState('Verifying Your Email...')
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const token = searchParams.get('token')

        if (!token) {
            setMessage('Invalid Verification link')
            return
        }

        const verifyToken = async () => {
            try {
                const response = await fetch(`${window.location.origin}/api/verify-token`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ token }),
                })


                if (response.ok) {
                    setMessage('Email verified successfully! Redirecting...')
                    setTimeout(() => router.push('/dashboard'), 2000)
                } else {
                    setMessage('Verification failed.')
                }
            } catch (error) {
                setMessage(error instanceof Error ? error.message : 'Verification failed.')
            } finally {
                setIsLoading(false)
            }
        }


        if (token && typeof token === 'string') verifyToken()

    }, [router, searchParams])



    return (
        <div className="flex items-center justify-center min-h-screen">
            {isLoading ? (
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary" />
            ) : (
                <>
                    <p className="text-lg">{message}</p>
                    {message.includes('successfuly') && (
                        <p className="text-muted-foreground">You will be redirected automatically</p>
                    )}
                </>
            )}
        </div>
    )
}

export default EmailVerifiedPage