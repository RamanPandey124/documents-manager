"use client"
import { CounterContext } from "@/context/CounterContext";
import Link from "next/link";
import { use, useContext, useState } from "react";
import { FaArrowLeft } from "react-icons/fa6";
import { MdOutlineNavigateNext } from "react-icons/md";
import { FaPaste } from "react-icons/fa6";
import { TransferFile } from "@/lib/actions/fileOptionsActions";
import { GrClear } from "react-icons/gr";

export default function PathNavigator() {
    const { state, dispatch } = use(CounterContext)
    const { path, currentParent, transferDetail, Transfermethod } = state
    const isPaste = (currentParent === transferDetail?.oldParent) || (currentParent === transferDetail?.fileID)
    const [isTransfering, setTransfer] = useState(false)

    const handleTransfer = async () => {
        const transferData = {
            child: transferDetail?.fileID,
            oldParent: transferDetail?.oldParent,
            newParent: currentParent,
            method: Transfermethod
        }
        setTransfer(true)
        const { success, msg } = await TransferFile(transferData)
        if (success) {
            dispatch({ type: "END_TRANSFER" })
        }
        setTransfer(false)
    }

    return (
        <>
            <div className="flex items-center space-x-6 border-2">
                <h1 className="px-4 text-3xl"><Link href={'/tree/main'}>My Files</Link></h1>

                {state.isTransfer ?
                    <div>
                        {isTransfering ?
                            <div className="flex items-center justify-center h-full w-full">
                                <div className={`animate-spin rounded-full border-2 border-b-0 border-blue-300 h-4 w-4`} />
                            </div>
                            :
                            <div className="space-x-6 flex">
                                <button
                                    disabled={isPaste}
                                    onClick={handleTransfer}>
                                    <FaPaste className={`${!isPaste && "text-white hover:text-slate-300"} h-6 w-6 text-gray-500 `} />
                                </button>
                                <button
                                    onClick={() => dispatch({ type: "END_TRANSFER" })}>
                                    <GrClear className={`text-red-200 hover:text-slate-300 h-6 w-6 `} />
                                </button>
                            </div>
                        }
                    </div>
                    : null}
            </div>

            <div className="mx-4 flex space-x-4">
                {path.length > 1 &&
                    <div>
                        <Link href={`/tree/main/${path[path.length - 2]._id}`}><FaArrowLeft /></Link>
                    </div>
                }

                <div>
                    {path?.map((item, index) => {
                        return (
                            <span key={item._id}>
                                {index > 0 &&
                                    <MdOutlineNavigateNext className="inline" />}
                                <Link href={`/tree/main/${item._id}`}>{item.name}</Link>
                            </span>
                        )
                    })}
                </div>
            </div>
        </>
    )
}