
import { resourceDocument } from "@/lib/types/tree";
import Link from "next/link";
import { FaFolder } from "react-icons/fa";
import FileOptionsMenu from "../singleUse/FileOptionsMenu";
import { CiFileOn } from "react-icons/ci";

export default function ResourceDirectory({ file }: { file: resourceDocument }) {
    function convert(date: string, full: boolean = false) {
        let strDate = new Date(date)
        if (full) { return `${strDate.toLocaleString().split(",")[1]}, ${strDate.toDateString()}` }
        return strDate.toLocaleDateString()
    }

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
                <div className="relative group/time cursor-pointer">
                    {convert(file.updatedAt.toString())}
                    <span className="border-2 absolute top-6 right-1/2 w-52 text-sm bg-gray-900 text-gray-300 invisible group-hover/time:visible z-10">
                        {convert(file.updatedAt.toString(), true)}
                    </span>
                </div>
            </td>
            <td className="invisible group-hover/item:visible">
                <FileOptionsMenu file={file} />
            </td>

        </tr>
    )
}
