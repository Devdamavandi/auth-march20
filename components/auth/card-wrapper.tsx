

'use client'

import {
    Card,
    CardTitle,
    CardHeader,
    CardContent,
    CardFooter
} from '@/components/ui/card'
import Link from 'next/link'
import { SocialButtons } from './social'

interface CardWrapperProps {
    children: React.ReactNode
    headerLabel: string
    headerTitle: string
    backButtonLabel: string
    backButtonHref: string
    showSocial?: boolean
}

export const CardWrapper = ({
    children, headerLabel, headerTitle, backButtonLabel, backButtonHref, showSocial
}: CardWrapperProps) => {
    return (

        <Card className='shadow-md w-[400px]'>
            <CardTitle className='text-center font-bold text-4xl'>{headerTitle}</CardTitle>
            <CardHeader className='text-black/50 text-sm text-center leading-0'>{headerLabel}</CardHeader>
            <CardContent>
                {children}
            </CardContent>
            {showSocial && (
                <CardFooter>
                    <SocialButtons />
                </CardFooter>
            )}
            <CardFooter className='flex justify-center'>
                <Link href={backButtonHref} className='text-black text-center'>{backButtonLabel}</Link>
            </CardFooter>
        </Card>
    )
}