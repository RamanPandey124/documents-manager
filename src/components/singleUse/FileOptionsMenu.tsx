"use client"
import { resourceDocument } from "@/lib/types/tree";
import { RxDragHandleDots2 } from "react-icons/rx";
import FileRename from "../fileOptions/FileRename";
import FileCopy from "../fileOptions/FileCopy";
import FileCut from "../fileOptions/FileCut";
import FileDelete from "../fileOptions/FileDelete";
import { IoText } from "react-icons/io5";
import { useContext } from "react";
import { CounterContext } from "@/context/CounterContext";


export default function FileOptionsMenu({ file }: { file: resourceDocument }) {
    const { dispatch } = useContext(CounterContext)

    return (
        <div className="relative group/feature">
            <RxDragHandleDots2 />
            <div className="invisible group-hover/feature:visible absolute top-0 right-2 bg-gray-900 min-h-32 min-w-24 p-2 divide-y-2 divide-slate-800">
                <div
                    onClick={() => dispatch({ type: 'RENAME', payload: file })}
                    className="flex items-center space-x-4 hover:bg-zinc-700 py-1 rounded-md cursor-pointer">
                    <IoText className="h-5 w-5" />
                    <p>Rename</p>
                </div>
            </div>
        </div>
    )
}
