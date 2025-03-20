


import { signIn } from "next-auth/react"
import { DEFAULT_LOGIN_REDIRECT } from "@/routes"
import { Button } from "../ui/button"
import { FcGoogle } from 'react-icons/fc'
import { FaGithub } from 'react-icons/fa'


export const SocialButtons = () => {

    const onClick = (provider: "google" | "github") => {
        signIn(provider, {
            callbackUrl: DEFAULT_LOGIN_REDIRECT,
        })
    }

    return (
        <div className="flex space-x-4 justify-center w-full">
            <Button onClick={() => onClick("google")}
                size={"lg"}
                variant={"outline"}
                className="flex-1 rounded cursor-pointer"
            >
                <FcGoogle size={48} />
            </Button>
            <Button onClick={() => onClick("github")}
                size={"lg"}
                variant={"outline"}
                className="flex-1 rounded cursor-pointer"
            >
                <FaGithub size={24} />
            </Button>
        </div>
    )
}