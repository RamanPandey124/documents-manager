"use client"


import { CounterContext } from "@/context/CounterContext"
import { useContext, useState } from "react"
import Modal from "../reuseable/Modal"
import InputBox from "../reuseable/InputBox"
import SubmitBtn from "../reuseable/SubmitBtn"
import { useFormState } from "react-dom"
import { resourceDocument } from "@/lib/types/tree"
import { IDeletePayload } from "@/lib/types/context"
import { DeleteFile } from "@/lib/actions/fileOptionsActions"


export default function DeleteFormSelector() {
    const { state, dispatch } = useContext(CounterContext)

    if (!state.isDelete || !state.deleteDetail) return null

    return (
        <Modal isModal={state.isDelete} handleModal={() => dispatch({ type: 'CANCEL_MODAL' })}>
            <DeleteFormModal payload={state.deleteDetail} handleModal={() => dispatch({ type: 'CANCEL_MODAL' })} />
        </Modal>
    )
}

function DeleteFormModal({ payload, handleModal }: { payload: IDeletePayload, handleModal: () => void }) {
    const [loading, setLoading] = useState(false)
    const { file, parentId } = payload
    const handleDelete = async () => {
        setLoading(true)
        const { success, msg } = await DeleteFile(payload)
        if (success) {
            handleModal()
        }
        setLoading(false)
    }

    return (
        <div className="space-y-1 w-96">
            <h1 className="text-2xl text-red-500">Delete</h1>
            <div>
                Are you want to delete <span className="font-bold text-red-200">{file.name}</span> {file.contentType}
            </div>

            <div className="flex space-x-3 justify-end">
                <button
                    onClick={handleModal}
                    className=" p-1 rounded-md bg-slate-700 hover:bg-slate-400">Cancel</button>
                <button
                    onClick={handleDelete}
                    className=" p-1 rounded-md bg-red-700 hover:bg-red-400">{loading ? 'deleting...' : "delete"}</button>
            </div>
        </div>
    )
}
