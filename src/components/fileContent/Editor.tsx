"use client"

import { resourceDocument } from "@/lib/types/tree";
import { Editor } from "@monaco-editor/react";
import { useState } from "react";
import SubmitBtn from "../reuseable/SubmitBtn";
import InputBox from "../reuseable/InputBox";
import { useFormState } from "react-dom";
import { updateFileContent } from "@/lib/actions/treeActions";
import { DownloadButton } from "../download/DownLoadButton";
import { convert } from "@/lib/handlers/TimeFormat";

export default function FileEditor({ file, content }: { file: resourceDocument, content: string }) {
    const [value, setValue] = useState(content)
    console.log(file)

    const [state, handleForm] = useFormState(updateFileContent, {})

    return (
        <div>
            <div className=" p-4 flex justify-between">
                <div>
                    <h1 className="text-2xl text-yellow-400 mb-4"> {file.name}</h1>
                    <p className="text-sm text-pink-200">Created: {convert(file.createdAt.toString(), true)}</p>
                    <p className="text-sm text-pink-200">Last modified: {convert(file.updatedAt.toString(), true)}</p>
                </div>
                <div>
                    <DownloadButton filePath={file.filePath} />
                </div>
            </div>
            <div className=" h-96 z-0">
                <Editor
                    value={content}
                    onChange={(e?: string) => setValue(e as string)}
                    theme='vs-dark'
                />
                <span className="text-end ">
                    {value !== content &&
                        <form action={handleForm} className="m-2">
                            <InputBox type="hidden" name="content" value={value} />
                            <InputBox type="hidden" name="uniquePath" value={file.filePath} />
                            <InputBox type="hidden" name="fileId" value={file._id} />
                            <SubmitBtn title="Save Changes" />
                        </form>
                    }
                    {(state.success && value === content) && <p className="text-green-500 mr-2">{state.msg}</p>}
                </span>
            </div>
        </div>
    )
}
