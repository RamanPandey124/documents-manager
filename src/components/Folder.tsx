import { folderProps } from "@/lib/types/tree";

export default function Folder({ file, renderTree, files }: folderProps) {
    const path = `${file.path}/${file.name}`

    return (
        <div className=" my-2 flex">
            <span className={`w-1 border-2 mx-1`} />
            <div>
                <h1 className="text-gray-300">{file.name}</h1>
                <div>{renderTree(files, path)}</div>
            </div>
        </div>
    )
}
