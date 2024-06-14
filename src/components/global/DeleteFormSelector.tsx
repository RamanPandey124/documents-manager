"use client"

import { CounterContext } from "@/context/CounterContext"
import { useContext } from "react"
import Modal from "../reuseable/Modal"
import InputBox from "../reuseable/InputBox"
import SubmitBtn from "../reuseable/SubmitBtn"
import { useFormState } from "react-dom"
import { resourceDocument } from "@/lib/types/tree"
import { IDeletePayload } from "@/lib/types/context"


export default function DeleteFormSelector() {
    const { state, dispatch } = useContext(CounterContext)

    if (!state.isDelete || !state.deleteDetail) return null

    return (
        <Modal isModal={state.isDelete} handleModal={() => dispatch({ type: 'CANCEL_MODAL' })}>
            <DeleteFormModal file={state.deleteDetail} handleModal={() => dispatch({ type: 'CANCEL_MODAL' })} />
        </Modal>
    )
}

function DeleteFormModal({ file, handleModal }: { file: IDeletePayload, handleModal: () => void }) {
    // const [formState, formAction] = useFormState(DeleteFileName, {})
    // if (formState.success) {
    //     handleModal()
    // }

    return (
        <div className="space-y-4">
            <h1 className="text-2xl text-blue-500">Delete</h1>
            <form className="flex flex-col items-end space-y-2">
                <InputBox name="fileId" type="text" value={file.id} />
                <InputBox name="name" type="text" defaultValue={file.parentId} focus />
                <SubmitBtn title="Delete" />
            </form>
            {/* <p>{!formState.success && formState.msg}</p> */}
        </div>
    )
}
