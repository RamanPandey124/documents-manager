interface fileProps {
    name: string;
}

export default function File({ name }: fileProps) {
    return (
        <div>
            <p className="text-green-500">{name}</p>
        </div>
    )
}