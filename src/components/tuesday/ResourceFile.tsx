import { resourceDocument } from "@/lib/types/tree";
import Link from "next/link";
import { CiFileOn } from "react-icons/ci";

export default function ResourceFile({ file }: { file: resourceDocument }) {

    return (
        <tr key={file._id}>
            <td className="px-4 py-2 flex">
                <CiFileOn className="h-5 w-5 relative top-1 mr-4" />
                <Link href={"#"} className="hover:text-blue-400">{file.name}</Link>
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
