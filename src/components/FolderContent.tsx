
import { folderContentProps } from "@/lib/types/tree"
import { FaFolder } from "react-icons/fa";

export default async function FolderContent({ file, renderTree }: folderContentProps) {
    const path = `${file.parent}/${file.name}`

    return (
        <div className="flex hover:bg-slate-800">
            <FaFolder className="relative top-1" />
            <span className={` mx-1`} />
            <div>
                <div className="text-gray-300">{file.name}</div>
                {renderTree(path)}
            </div>
        </div>
    )
}