

import { CardWrapper } from "@/components/auth/card-wrapper";

export default function ErrorPage() {
    return (
        <CardWrapper
            headerTitle="Error"
            headerLabel="Oops! Something went wrong!"
            backButtonLabel="Back to login"
            backButtonHref="/auth/login"
        >
            <div className="w-full flex justify-center items-center">
                <p className="text-destructive">Authentication error occurred.</p>
            </div>
        </CardWrapper>
    );
}