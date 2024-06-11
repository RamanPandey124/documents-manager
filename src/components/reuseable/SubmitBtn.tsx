'use client'

import { useFormStatus } from "react-dom"

export default function SubmitBtn({ title }: { title: string }) {
    const { pending } = useFormStatus()

    return (
        <button
            type="submit"
            className="bg-blue-500 p-1 px-4 rounded-md hover:bg-blue-700"
            disabled={pending}
        >
            {pending ? "loading..." : title}
        </button>
    )
}