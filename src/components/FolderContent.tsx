
export default async function FolderContent({ file, renderTree }) {
    const path = `${file.parent}/${file.name}`

    return (
        <div className="flex">
            <span className={`border-2 mx-2 `} />
            <div>
                <div className="text-gray-300">{file.name}</div>
                <div>{renderTree(path)}</div>
            </div>
        </div>
    )
}