"use client"
import { resourceDocument } from "@/lib/types/tree";
import { RxDragHandleDots2 } from "react-icons/rx";
import { IoText } from "react-icons/io5";
import { useContext } from "react";
import { CounterContext } from "@/context/CounterContext";
import { GoCopy } from "react-icons/go";
import { IoIosCut } from "react-icons/io";
import { MdDelete } from "react-icons/md";



export default function FileOptionsMenu({ file }: { file: resourceDocument }) {
    const { dispatch, state } = useContext(CounterContext)

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
                <div
                    onClick={() => dispatch({ type: "TRANSFER", payload: { file, method: 'copy', oldParent: state.currentParent } })}
                    className="flex items-center space-x-4 hover:bg-zinc-700 py-1 rounded-md cursor-pointer">
                    <GoCopy className="h-5 w-5" />
                    <p>Copy</p>
                </div>
                <div
                    onClick={() => dispatch({ type: "TRANSFER", payload: { file, method: 'cut', oldParent: state.currentParent } })}
                    className="flex items-center space-x-4 hover:bg-zinc-700 py-1 rounded-md cursor-pointer">
                    <IoIosCut className="h-5 w-5" />
                    <p>Cut</p>
                </div>
                <div
                    onClick={() => dispatch({ type: 'DELETE', payload: { file, parentId: state.currentParent } })}
                    className="flex items-center space-x-4 hover:bg-zinc-700 py-1 rounded-md cursor-pointer">
                    <MdDelete className="h-5 w-5" />
                    <p>Delete</p>
                </div>
            </div>
        </div>
    )
}
