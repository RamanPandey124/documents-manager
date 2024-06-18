"use client"

import { CounterContext } from "@/context/CounterContext"
import { useContext } from "react"
import Modal from "../reuseable/Modal"
import InputBox from "../reuseable/InputBox"
import SubmitBtn from "../reuseable/SubmitBtn"
import { useFormState } from "react-dom"
import { resourceDocument } from "@/lib/types/tree"
import { RenameFileName } from "@/lib/actions/fileOptionsActions"


export default function RenameFormSelector() {
    const { state, dispatch } = useContext(CounterContext)

    if (!state.isRename || !state.renameData || !state.currentParent) return null

    return (
        <Modal isModal={state.isRename} handleModal={() => dispatch({ type: 'CANCEL_MODAL' })}>
            <RenameFormModal file={state.renameData} parentId={state.currentParent} handleModal={() => dispatch({ type: 'CANCEL_MODAL' })} />
        </Modal>
    )
}

function RenameFormModal({ file, parentId, handleModal }: { file: resourceDocument, handleModal: () => void, parentId: string }) {
    const [formState, formAction] = useFormState(RenameFileName, {})
    if (formState.success) {
        handleModal()
    }

    return (
        <div className="space-y-4">
            <h1 className="text-2xl text-blue-500">Rename</h1>
            <form action={formAction} className="flex flex-col items-end space-y-2">
                <InputBox name="parentId" type="hidden" value={parentId} />
                <InputBox name="fileId" type="hidden" value={file._id} />
                <InputBox name="name" type="text" defaultValue={file.name} focus />
                <SubmitBtn title="Rename" />
            </form>
            <p>{!formState.success && formState.msg}</p>
        </div>
    )
}
