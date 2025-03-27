

'use client'

import { useForm } from "react-hook-form"
import { Form, FormControl, FormField, FormItem } from "../ui/form"
import { CardWrapper } from "./card-wrapper"
import { LoginSchema } from "@/schemas"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { login } from "@/actions/login"
import { useState } from "react"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { FormError } from "./form-error"
import { FormSuccess } from "./form-success"
import { useRouter } from "next/navigation"
import { DEFAULT_LOGIN_REDIRECT } from "@/routes"



export const LoginForm = () => {

    const [error, setError] = useState<string | undefined>("")
    const [success, setSuccess] = useState<string | undefined>("")
    const [isLoading, setIsLoading] = useState(false)

    const router = useRouter()

    const form = useForm<z.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: "",
            password: "",
        }
    })

    const onSubmit = async (values: z.infer<typeof LoginSchema>) => {
        console.log('Form Submitted with values: ', values)
        setError("")
        setSuccess("")
        setIsLoading(true)

        try {
            const result = await login(values)
            console.log('Login Result: ', result)
            if (result?.error) {
                setError(result.error)
            } else if (result?.success) {
                console.log('Redirecting to ', DEFAULT_LOGIN_REDIRECT)
                router.push(DEFAULT_LOGIN_REDIRECT)
            }
        } catch (error) {
            console.log('Unexpected error during login: ', error) // Log unexpected errors
            setError("something went wrong in login-form")
        } finally {
            setIsLoading(false)
        }
    }
    return (

        <CardWrapper
            headerTitle="Login"
            headerLabel="here you can Signin to Your Account"
            backButtonLabel="Dont have an account?"
            backButtonHref="/auth/register"
            showSocial
        >

            <Form {...form}>
                <form onSubmit={form.handleSubmit((values) => {
                    console.log('Form handleSubmit called with values:', values)
                    onSubmit(values)
                })} className="space-y-2">
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input
                                        {...field}
                                        type="email"
                                        placeholder="john@example.com"
                                        className="h-12"
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input
                                        {...field}
                                        type="password"
                                        placeholder="******"
                                        className="h-12"
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <FormError message={error} />
                    <FormSuccess message={success} />
                    <Button
                        type="submit"
                        className="mt-1 cursor-pointer w-full py-4"
                        disabled={isLoading}
                    >
                        {isLoading ? "Signing in..." : "Sign in"}
                    </Button>
                </form>
            </Form>
        </CardWrapper>

    )
}

export default LoginForm