import { resourceDocument } from "@/lib/types/tree";
import { MdDelete } from "react-icons/md";

export default function FileDelete({ file }: { file: resourceDocument }) {
    return (
        <div className="flex items-center space-x-4 hover:bg-zinc-700 py-1 rounded-md">
            <MdDelete className="h-5 w-5" />
            <p>Delete</p>
        </div>
    )
}
