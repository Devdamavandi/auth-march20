

interface messageProps {
    message?: string
}

export const FormSuccess = ({ message }: messageProps) => {
    if (!message) return null

    return (
        <div className="bg-emerald-200/30 rounded w-full py-2">
            <p className="text-emerald-600 p-2">{message}</p>
        </div>
    )
}