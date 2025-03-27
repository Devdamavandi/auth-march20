
'use client'

import { VerifyEmailContent } from "@/components/verify-email-content"
import { Suspense } from "react"



const VerifyEmailPage = () => {

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <VerifyEmailContent />
        </Suspense>
    )
}

export default VerifyEmailPage