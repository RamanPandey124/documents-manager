
"use client"

import { CounterContext } from "@/context/CounterContext"
import { useContext, useState } from "react"
import Modal from "../reuseable/Modal"
import { IDublicateDetails } from "@/lib/types/context"
import { ReplaceFile } from "@/lib/actions/fileOptionsActions"
import toast from "react-hot-toast"


export default function DuplicateFormSelector() {
    const { state, dispatch } = useContext(CounterContext)

    if (!state.isDublicateExist || !state.DublicateDetails) return null
    const handleCancel = () => {
        dispatch({ type: 'CANCEL_MODAL' })
        dispatch({ type: "END_TRANSFER" })
    }

    return (
        <Modal isModal={state.isDublicateExist} handleModal={() => dispatch({ type: 'CANCEL_MODAL' })}>
            <DuplicateFormModal payload={state.DublicateDetails} handleCancel={handleCancel} />
        </Modal>
    )
}

function DuplicateFormModal({ payload, handleCancel }: { payload: IDublicateDetails, handleCancel: () => void }) {
    const [loading, setLoading] = useState(false)
    const [errorMessage, setError] = useState<string | undefined>()

    const handleDuplicateTransfer = async () => {
        setLoading(true)
        const { success, msg } = await ReplaceFile(payload)
        if (!success) {
            setError(msg)
            toast.error(msg)
        }
        else {
            handleCancel()
        }
        setLoading(false)
    }

    return (
        <div className="space-y-1 w-96">
            <h1 className="text-2xl text-red-500">Confirm replace</h1>
            <div>
                {payload.msg}
                <p className="text-red-200">would you like to replace it</p>
            </div>

            <div className="flex space-x-3 justify-end">
                <button
                    disabled={loading}
                    onClick={handleCancel}
                    className=" p-1 rounded-md bg-slate-700 hover:bg-slate-400">Cancel</button>
                <button
                    disabled={loading}
                    onClick={handleDuplicateTransfer}
                    className=" p-1 rounded-md bg-red-700 hover:bg-red-400">{loading ? 'replacing...' : "replace"}</button>
            </div>
            <div>{errorMessage}</div>
        </div>
    )
}
