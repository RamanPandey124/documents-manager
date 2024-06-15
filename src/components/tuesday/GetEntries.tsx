import NavigateHandler from "../fileContent/NavigateHandler"
import ResourceDirectory from "./ResourceDirectory"
import { getDriveContents } from "@/lib/actions/treeActions"


export default async function GetEntries({ path }: { path: string }) {
    const { parent, children } = await getDriveContents(path)

    return (
        <div className="px-4">
            <NavigateHandler parent={parent} />
            <table className="w-full divide-y-2 bg-slate-800 divide-zinc-500 shadow-sm shadow-gray-400">
                <thead className=" bg-zinc-600">
                    <tr className="text-left py-4">
                        <th className="px-4">Name</th>
                        <th>Type</th>
                        <th>Last modified</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody className="divide-y-2 divide-zinc-500 ">
                    {children.map(file => {
                        return <ResourceDirectory key={file._id} file={file} />
                    })}
                </tbody>
            </table>
        </div>
    )
}