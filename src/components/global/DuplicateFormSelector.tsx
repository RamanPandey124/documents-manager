
"use client"

import { CounterContext } from "@/context/CounterContext"
import { useContext, useState } from "react"
import Modal from "../reuseable/Modal"
import InputBox from "../reuseable/InputBox"
import SubmitBtn from "../reuseable/SubmitBtn"
import { useFormState } from "react-dom"
import { resourceDocument } from "@/lib/types/tree"
import { IDeletePayload, IDublicateDetails } from "@/lib/types/context"
import { DeleteFile, ReplaceFile } from "@/lib/actions/fileOptionsActions"


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
    const [errorMessage, setError] = useState('')

    const handleDuplicateTransfer = async () => {
        setLoading(true)
        const { success, msg } = await ReplaceFile(payload)
        if (!success) {
            setError(msg)
        }
        handleCancel()
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
                    onClick={handleCancel}
                    className=" p-1 rounded-md bg-slate-700 hover:bg-slate-400">Cancel</button>
                <button
                    onClick={handleDuplicateTransfer}
                    className=" p-1 rounded-md bg-red-700 hover:bg-red-400">{loading ? 'replacing...' : "replace"}</button>
            </div>
            <div>{errorMessage}</div>
        </div>
    )
}
