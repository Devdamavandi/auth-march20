

interface messageProps {
    message?: string
}


export const FormError = ({ message }: messageProps) => {
    if (!message) return null
    return (
        <div className="bg-red-200/30 rounded py-2 w-full ">
            <span className="text-red-600 p-2">{message}</span>
        </div>
    )
}