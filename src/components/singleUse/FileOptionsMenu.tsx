"use client"
import { IfileOptionsMenuProps, resourceDocument } from "@/lib/types/tree";
import { RxDragHandleDots2 } from "react-icons/rx";
import { IoText } from "react-icons/io5";
import { useContext } from "react";
import { CounterContext } from "@/context/CounterContext";
import { GoCopy } from "react-icons/go";
import { IoIosCut } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import { DownloadButton } from "../download/DownLoadButton";

export default function FileOptionsMenu({ file }: { file: resourceDocument }) {
    const { dispatch, state } = useContext(CounterContext)
    let optionArray: IfileOptionsMenuProps[] = [
        {
            onClick: () => dispatch({ type: 'RENAME', payload: file }),
            icon: <IoText className="h-5 w-5" />,
            name: 'Rename'
        },
        {
            onClick: () => dispatch({ type: "TRANSFER", payload: { file, method: 'copy', oldParent: state.currentParent } }),
            icon: <GoCopy className="h-5 w-5" />,
            name: 'Copy'
        },
        {
            onClick: () => dispatch({ type: "TRANSFER", payload: { file, method: 'cut', oldParent: state.currentParent } }),
            icon: <IoIosCut className="h-5 w-5" />,
            name: 'Cut'
        },
        {
            onClick: () => dispatch({ type: 'DELETE', payload: { file, parentId: state.currentParent } }),
            icon: <MdDelete className="h-5 w-5" />,
            name: 'Delete'
        },

    ]

    return (
        <div className="relative group/feature z-10">
            <RxDragHandleDots2 />
            <div className="invisible group-hover/feature:visible absolute top-0 right-2 bg-gray-900 min-h-32 min-w-24 p-2 divide-y-2 divide-slate-800">
                {optionArray.map(item => <FileOptionIcons key={item.name} onClick={item.onClick} icon={item.icon} name={item.name} />)}
                {file.contentType === 'file' && <DownloadButton filePath={file.filePath} />}
            </div>
        </div>
    )
}

function FileOptionIcons({ onClick, icon, name }: IfileOptionsMenuProps) {
    return (
        <div
            onClick={onClick}
            className="flex items-center space-x-4 hover:bg-zinc-700 py-1 rounded-md cursor-pointer">
            {icon}
            <p>{name}</p>
        </div>)
}