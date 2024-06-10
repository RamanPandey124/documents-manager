interface InputProps {
    name: string;
    label?: string;
    type: string;
    value?: string | number;
    placeholder?: string;
    focus?: boolean;
    hidden?: boolean;
    defaultValue?: string | number
}


export default function InputBox({ name, label, type, value, placeholder, focus = false, hidden = false, defaultValue }: InputProps) {
    return (
        <div>
            <label htmlFor={name}>{label}</label>
            <input
                id={name}
                name={name}
                className="bg-transparent border-2 rounded-md px-2 py-1 focus:bg-zinc-600 block"
                type={type}
                value={value}
                placeholder={placeholder}
                autoFocus={focus}
                hidden={hidden}
                defaultValue={defaultValue}
                required
            />
        </div>
    )
}