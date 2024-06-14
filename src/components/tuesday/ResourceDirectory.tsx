import { IResource } from "@/lib/types/model";
import { resourceDocument } from "@/lib/types/tree";
import Link from "next/link";
import { FaFolder } from "react-icons/fa";
import { RxDragHandleDots2 } from "react-icons/rx";
import FileOptionsMenu from "../singleUse/FileOptionsMenu";
import { CiFileOn } from "react-icons/ci";

export default function ResourceDirectory({ file }: { file: resourceDocument }) {
    return (
        <tr className="hover:bg-zinc-700 group/item">
            <td className="px-4 py-2 flex">
                {file.contentType === 'directory' ?
                    <>
                        <FaFolder className="h-5 w-5 relative top-1 mr-4" />
                        <Link href={`/tree/main/${file._id}`} className="hover:text-blue-400">{file.name}</Link>
                    </> :
                    <>
                        <CiFileOn className="h-5 w-5 relative top-1 mr-4" />
                        <Link href={`/tree/blob/${file._id}`} className="hover:text-blue-400">{file.name}</Link>
                    </>
                }
            </td>
            <td>
                {file.contentType}
            </td>
            <td>
                {file.updatedAt.toLocaleDateString()}
            </td>
            <td className="invisible group-hover/item:visible">
                <FileOptionsMenu file={file} />
            </td>

        </tr>
    )
}
