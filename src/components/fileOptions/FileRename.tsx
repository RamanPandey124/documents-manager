"use client"
import { resourceDocument } from "@/lib/types/tree";
import { IoText } from "react-icons/io5";

export default function FileRename({ file }: { file: resourceDocument }) {

    return (
        <>
            <div
                className="flex items-center space-x-4 hover:bg-zinc-700 py-1 rounded-md cursor-pointer">
                <IoText className="h-5 w-5" />
                <p>Rename</p>
            </div>
        </>
    )
}  