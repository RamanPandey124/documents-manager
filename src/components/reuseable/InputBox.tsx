import { InputProps } from "@/lib/types/tree";

export default function InputBox({ name, label, type, value, placeholder, focus = false, defaultValue }: InputProps) {
    return (
        <div className="w-full">
            <label htmlFor={name}>{label}</label>
            <input
                id={name}
                name={name}
                className="bg-transparent border-2 rounded-md px-2 py-1 focus:bg-zinc-600 block w-full"
                type={type}
                value={value}
                placeholder={placeholder}
                autoFocus={focus}
                defaultValue={defaultValue}
                required
            />
        </div>
    )
}