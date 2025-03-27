

'use client'

import { useEffect, useState } from "react"
import { CardWrapper } from "./auth/card-wrapper"
import { useSearchParams } from "next/navigation"
import { FormSuccess } from "./auth/form-success"
import { FormError } from "./auth/form-error"


export const VerifyEmailContent = () => {

    const [error, setError] = useState<string | undefined>()
    const [success, setSuccess] = useState<string | undefined>()

    const searchParams = useSearchParams()
    const token = searchParams.get('token')

    useEffect(() => {
        const verifyEmail = async () => {
            if (!token) {
                setError('Missing token!')
                return
            }

            try {
                const response = await fetch('/api/verify-email', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ token })
                })

                if (response.ok) {
                    setSuccess('Email verified successfully!')
                } else {
                    setError('Invalid token or verification failed')
                }
            } catch {
                setError('Something went wrong!')
            }
        }

        verifyEmail()
    }, [token])

    return (
        <CardWrapper
            headerTitle="Email Verification"
            headerLabel="Confirming your email"
            backButtonLabel="Back to login"
            backButtonHref="/auth/login"
        >
            <div className="flex items-center w-full justify-center">
                {!error && !success && <p>Verifying your email...</p>}
                <FormSuccess message={success} />
                <FormError message={error} />
            </div>
        </CardWrapper>
    )
}