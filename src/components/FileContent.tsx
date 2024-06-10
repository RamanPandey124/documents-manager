import { FileContentProps } from "@/lib/types/tree";
import { CiFileOn } from "react-icons/ci";


export default function FileContent({ file }: FileContentProps) {
    return (
        <div className="flex hover:bg-slate-800">
            <CiFileOn className="relative top-1" />
            <span className={`mx-1`} />
            <div className="text-green-500">{file.name}</div>
        </div>
    )
}