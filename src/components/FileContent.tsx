
export default function FileContent({ file }) {
    return (
        <div className="flex">
            <span className={`${file.parent == 'tree' && "border-2"} mx-2`} />
            <div className="text-green-500">{file.name}</div>
        </div>
    )
}