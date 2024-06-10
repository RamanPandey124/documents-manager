import { createFolderHierachy } from "@/lib/actions/treeActions";
import InputBox from "./InputBox";
import SubmitBtn from "./SubmitBtn";
import { useFormState } from "react-dom";



export default function FolderArchitect({ path, handleModal }: { path: string, handleModal: () => void }) {
    const [state, formAction] = useFormState(createFolderHierachy, null)
    if (state?.success) {
        handleModal()
    }

    return (
        <div>
            <h1 className="mb-4 text-2xl text-blue-500">Create new</h1>
            <form className="space-y-2" action={formAction}>
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

                <InputBox name="path" label="Path" type="text" placeholder="path" defaultValue={path} />
                <InputBox name="name" label="Name" type="text" placeholder="name your folder/file" focus />

                <div className="flex justify-end">
                    <SubmitBtn title="Create" />
                </div>
                < p className="text-red-400 text-lg">{state?.msg}</p>
            </form>
        </div >
    )
}