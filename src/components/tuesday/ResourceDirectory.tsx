import { IResource } from "@/lib/types/model";
import { resourceDocument } from "@/lib/types/tree";
import Link from "next/link";
import { FaFolder } from "react-icons/fa";


export default function ResourceDirectory({ file }: { file: resourceDocument }) {
    return (
        <tr key={file._id}>
            <td className="px-4 py-2 flex">
                <FaFolder className="h-5 w-5 relative top-1 mr-4" />
                <Link href={`/tree/main/${file._id}`} className="hover:text-blue-400">{file.name}</Link>
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
