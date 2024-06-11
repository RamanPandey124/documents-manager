import { resourceDocument } from "@/lib/types/tree"
import ResourceDirectory from "./ResourceDirectory"
import ResourceFile from "./ResourceFile"
import dbConnect from "@/lib/dbConnect"
import Resource from "@/models/Resource"

const getDriveContents = async (parentId: string) => {
    await dbConnect()
    return await Resource.find({ parent: { $in: parentId } })
}

export default async function GetEntries({ path }: { path: string }) {
    const Entries: resourceDocument[] = await getDriveContents(path)

    return <tbody className="divide-y-2 divide-zinc-500 ">
        {Entries.map(file => {
            if (file.contentType === 'directory') {
                return <ResourceDirectory file={file} />
            }
            return <ResourceFile file={file} />
        })}
    </tbody>
}