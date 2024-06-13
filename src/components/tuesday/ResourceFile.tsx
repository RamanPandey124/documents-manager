import { resourceDocument } from "@/lib/types/tree";
import Link from "next/link";
import { CiFileOn } from "react-icons/ci";

export default function ResourceFile({ file }: { file: resourceDocument }) {

    return (
        <tr>
            <td className="px-4 py-2 flex">
                <CiFileOn className="h-5 w-5 relative top-1 mr-4" />
                <Link href={`/tree/blob/${file._id}`} className="hover:text-blue-400">{file.name}</Link>
            </td>
            <td>
                {file.contentType}
            </td>
            <td>
                {file.updatedAt.toLocaleDateString()}
            </td>

        </tr>
    )
}
