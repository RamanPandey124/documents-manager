import FileContent from "@/components/FileContent"
import FolderContent from "@/components/FolderContent"
import dbConnect from "@/lib/dbConnect"
import { documentSchema } from "@/lib/types/tree"
import FileSystemHierarchy from "@/models/FileSystemHierarchy"

const fetchTreeDocuments = async (parent: string = "tree") => {
    await dbConnect()
    const result = await FileSystemHierarchy.find({ parent })
    return result.map(v => {
        if (v.contentType == "directory") {
            return <FolderContent file={v} renderTree={fetchTreeDocuments} />
        }
        return <FileContent file={v} />
    })
}

export default async function main() {
    return (
        <div>
            {fetchTreeDocuments()}
        </div>
    )
}