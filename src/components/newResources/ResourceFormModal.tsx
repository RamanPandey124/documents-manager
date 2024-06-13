import { createDbResource } from "@/lib/actions/treeActions"
import { useFormState } from "react-dom"
import InputBox from "../reuseable/InputBox"
import SubmitBtn from "../reuseable/SubmitBtn"
import { useState } from "react"
import FolderSelector from "../singleUse/FolderSelector"

export default function ResourceFormModal({ handleModal, FormType }: { handleModal: () => void, FormType: string }) {
    const [state, formAction] = useFormState(createDbResource, {})
    if (state?.success) {
        handleModal()
    }
    const [currentParent, setCurrent] = useState<string>()

    const handleFolder = (parentId: string) => {
        setCurrent(parentId)
    }


    return (
        <div className="w-80">
            <h1 className="mb-4 text-2xl text-blue-500">{FormType === 'create' ? "Create new" : "Upload file"}</h1>
            <form className="space-y-2" action={formAction}>
                {FormType === 'create' ?
                    <>
                        <span>
                            <label htmlFor="contentType">Content Type</label>
                            <select
                                id="contentType"
                                name="contentType"
                                className="block w-full bg-transparent border-2 rounded-md px-2 py-1">
                                <option className="bg-zinc-700" defaultChecked>directory</option>
                                <option className="bg-zinc-700">file</option>
                            </select>
                        </span>
                        <InputBox name="name" label="Name" type="text" placeholder="name your folder/file" focus />
                    </> : <>
                        <InputBox name="file" type="file" />
                        <InputBox type="hidden" name="contentType" value={'file'} />
                    </>}
                    
                <InputBox name="formType" type="hidden" value={FormType} />
                <InputBox name="parentId" type="hidden" value={currentParent} />

                <div>
                    <label>Path</label>
                    <div className="border-2 rounded-md h-28 p-2 ">
                        <FolderSelector handleFolder={handleFolder} />
                    </div>
                </div>

                <div className="flex justify-end">
                    <SubmitBtn title={FormType} />
                </div>

                < p className="text-red-400 text-lg">{state?.msg}</p>
            </form>
        </div >
    )
}