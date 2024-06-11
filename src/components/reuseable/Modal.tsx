import { ModalInterface } from "@/lib/types/tree";
import React from "react";
import { MdCancel } from "react-icons/md";

export default function Modal({ isModal, handleModal, children }: ModalInterface) {
    if (!isModal) {
        return null
    }
    return (
        <div className="flex justify-center items-start absolute top-0 left-0 h-screen w-screen bg-zinc-950 opacity-70">
            <div className=" shadow-sm shadow-red-200 p-4 relative bg-zinc-800 mt-12 min-h-24 min-w-24">
                <MdCancel className="absolute h-5 w-5 top-1 right-1 text-red-400 hover:text-gray-200" onClick={handleModal} />
                <div className="mt-8">
                    {children}
                </div>
            </div>
        </div>
    )
}