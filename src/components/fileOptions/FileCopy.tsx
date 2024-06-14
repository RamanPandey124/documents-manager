import { resourceDocument } from "@/lib/types/tree";
import { GoCopy } from "react-icons/go";


export default function FileCopy({ file }: { file: resourceDocument }) {
    return (
        <div className="flex items-center space-x-4 hover:bg-zinc-700 py-1 rounded-md">
            <GoCopy className="h-5 w-5" />
            <p>Copy</p>
        </div>
    )
}