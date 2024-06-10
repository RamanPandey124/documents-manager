import { hierarchyDocument } from "@/lib/types/tree";
import Link from "next/link";
import { CiFileOn } from "react-icons/ci";


const generateFilePath = (file: hierarchyDocument) => {
    let filePath: string | string[] = file.path.split('/')
    filePath.splice(0, 1, "/main")
    filePath.push(file.name)
    return filePath.join("/")
}

export default function FileMetaData({ file }: { file: hierarchyDocument }) {
    let filePath = generateFilePath(file)
    return (
        <tr key={file._id}>
            <td className="px-4 py-2 flex">
                <CiFileOn className="h-5 w-5 relative top-1 mr-4" />
                <Link href={filePath} className="hover:text-blue-400">{file.name}</Link>
            </td>
            <td>
                {file.contentType}
            </td>
            <td>
                {file.createdAt.toLocaleDateString()}
            </td>

        </tr>
    )
}
