import { resourceDocument } from "@/lib/types/tree";
import { IoIosCut } from "react-icons/io";

export default function FileCut({ file }: { file: resourceDocument }) {
    return (
        <div className="flex items-center space-x-4 hover:bg-zinc-700 py-1 rounded-md">
            <IoIosCut className="h-5 w-5" />
            <p>Cut</p>
        </div>
    )
}