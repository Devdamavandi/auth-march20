





'use client'

import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";


export interface User {
    name?: string;
    email?: string;
    role?: string;
}

const DashboardClient = ({ user }: { user: User }) => {

    const router = useRouter()

    const handleSignOut = async () => {
        await signOut({
            redirect: true,
            callbackUrl: "/auth/login"
        })
        router.refresh()
    }

    return (
        <div>
            <h1 className=" font-bold text-6xl ml-10">This is dashboard Page</h1>
            <div className="ml-10  mt-[3vh]">
                <p><b>Name:</b> {user?.name}</p>
                <p><b>Email:</b> {user?.email}</p>
                <p><b>Role:</b> {user?.role}</p>
                <Button
                    variant={'destructive'}
                    className="mt-5 cursor-pointer"
                    onClick={handleSignOut}
                >
                    Sign out
                </Button>
            </div>
        </div>
    );
}

export default DashboardClient;