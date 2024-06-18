"use client"
import { CounterContext } from "@/context/CounterContext";
import Link from "next/link";
import { use, useContext, useState } from "react";
import { FaArrowLeft } from "react-icons/fa6";
import { MdOutlineNavigateNext } from "react-icons/md";
import { FaPaste } from "react-icons/fa6";
import { TransferFile, checkDuplicatePaste } from "@/lib/actions/fileOptionsActions";
import { GrClear } from "react-icons/gr";
import { toast } from 'react-hot-toast';
import { resourceDocument } from "@/lib/types/tree";


export default function PathNavigator() {
    const { state, dispatch } = use(CounterContext)
    const { path, currentParent, transferDetail, Transfermethod } = state
    const isPaste = (currentParent === transferDetail?.oldParent) || (currentParent === transferDetail?.fileID)
    const [isTransfering, setTransfer] = useState(false)

    const handleTransfer = async () => {
        const transferData = {
            childId: transferDetail?.fileID,
            childName: transferDetail?.fileName,
            oldParent: transferDetail?.oldParent,
            newParent: currentParent,
            method: Transfermethod
        }
        setTransfer(true)
        const { success, msg, isDuplicateExist, providedDetail, existingDetail } = await checkDuplicatePaste(transferData)
        if (!success && isDuplicateExist && providedDetail && existingDetail) {
            const dublicateDetail = {
                msg,
                providedDetail,
                existingDetail
            }
            dispatch({ type: "DUBLICATE_PASTE", payload: dublicateDetail })
        }
        else if (!success) {
            toast.error(msg)
        }
        else {
            dispatch({ type: "END_TRANSFER" })
        }
        setTransfer(false)
    }

    return (
        <>
            <div className="flex items-center space-x-6">
                <h1 className="px-4 text-3xl hover:text-blue-800"><Link href={'/main'}>My Files</Link></h1>

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

            <div className="mx-4 flex space-x-4 items-center">
                {path.length > 1 && <ReturnPath path={path} />}

                <div>
                    {path?.map((item, index) => {
                        const route = item.contentType === 'file' ? 'blob' : 'main'
                        return (
                            <span key={item._id}>
                                {index > 0 &&
                                    <MdOutlineNavigateNext className="inline mx-1" />}
                                <Link href={`/${route}/${item._id}`} className="hover:text-blue-400 hover:border-b-2 border-blue-400">{item.name}</Link>
                            </span>
                        )
                    })}
                </div>
            </div>
        </>
    )
}

function ReturnPath({ path }: { path: resourceDocument[] }) {
    const link = path[path.length - 2]
    const route = link.contentType === 'file' ? "blob" : "main"

    return (
        <Link href={`/${route}/${link._id}`}>
            <FaArrowLeft className="hover:text-gray-400 h-5 w-5" />
        </Link>
    )
}