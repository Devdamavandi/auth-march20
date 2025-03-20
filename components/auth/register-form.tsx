

'use client'

import { z } from "zod"
import { CardWrapper } from "./card-wrapper"
import { RegisterSchema } from "@/schemas"
import { register } from "@/actions/register"
import { useForm } from "react-hook-form"

import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormField, FormItem, FormMessage } from "../ui/form"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { FormSuccess } from "./form-success"
import { useState } from "react"
import { FormError } from "./form-error"


export const RegisterForm = () => {

    const [success, setSuccess] = useState<string | undefined>("")
    const [error, setError] = useState<string | undefined>("")

    const form = useForm<z.infer<typeof RegisterSchema>>({
        resolver: zodResolver(RegisterSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
            role: "USER"
        }
    })

    const onSubmit = async (values: z.infer<typeof RegisterSchema>) => {
        setSuccess("")
        setError("")
        register(values).then((data) => {
            setSuccess(data?.success)
            setError(data?.error)
        })
        console.log(values)
    }

    return (
        <CardWrapper
            headerTitle="Signup"
            headerLabel="here you can register"
            backButtonLabel="Already have an account?"
            backButtonHref="/auth/login"
            showSocial
        >
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">

                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input
                                        {...field}
                                        type="name"
                                        placeholder="John"
                                        className="h-12"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input
                                        {...field}
                                        type="email"
                                        placeholder="John@example.com"
                                        className="h-12"
                                    />
                                </FormControl>
                                <FormMessage />
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
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="role"
                        render={({ field }) => (
                            <FormItem className="mb-4">
                                <FormControl>
                                    <Select
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Choose Your Privilege" />
                                        </SelectTrigger>
                                        <SelectContent className="mb-2">
                                            <SelectItem value="USER" className="cursor-pointer">User</SelectItem>
                                            <SelectItem value="ADMIN" className="cursor-pointer">Admin</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormError message={error} />
                    <FormSuccess message={success} />
                    <Button type="submit" variant="default" className="mt-1 w-full cursor-pointer">submit</Button>
                </form>
            </Form>
        </CardWrapper>
    )
}

export default RegisterForm