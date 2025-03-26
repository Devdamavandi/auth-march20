



// components/layout-client.tsx
'use client';

import { usePathname } from 'next/navigation';
import Navbar from '@/components/ui/navbar';
import Footer from '@/components/ui/footer';

export default function LayoutClient({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    // 1. Dashboard
    if (pathname.startsWith('/dashboard')) {
        return <>{children}</>
    }

    // 2. Auth pages - centered content with no Navbar/Footer
    if (['/auth/login', '/auth/register'].includes(pathname)) {
        return (
            <main className='min-h-screen flex items-center justify-center'>
                {children}
            </main>
        )
    }

    // 3. Home page - N o layout constraints (let homePage handle everything)
    if (pathname === '/') {
        return <>{children}</>
    }

    // 4. All other pages - Standard layout with navbar and footer

    return (
        <div className='flex flex-col min-h-screen items-center '>
            <Navbar />
            <main className='flex-1'>
                {children}
            </main>
            <Footer />
        </div>
    );
}