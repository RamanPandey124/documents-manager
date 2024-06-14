import NavigateHandler from "../fileContent/NavigateHandler"
import ResourceDirectory from "./ResourceDirectory"
import ResourceFile from "./ResourceFile"
import { getDriveContents } from "@/lib/actions/treeActions"


export default async function GetEntries({ path }: { path: string }) {
    const { parent, children } = await getDriveContents(path)
    
    return (
        <div>
            <NavigateHandler parent={parent}/>
            <table className="w-full divide-y-2 divide-zinc-500 shadow-sm shadow-gray-400">
                <thead className=" bg-zinc-600">
                    <tr className="text-left">
                        <th className="px-4">Name</th>
                        <th>Type</th>
                        <th>Last modified</th>
                    </tr>
                </thead>
                <tbody className="divide-y-2 divide-zinc-500 ">
                    {children.map(file => {
                        if (file.contentType === 'directory') {
                            return <ResourceDirectory key={file._id} file={file} />
                        }
                        return <ResourceFile key={file._id} file={file} />
                    })}
                </tbody>
            </table>
        </div>
    )
}