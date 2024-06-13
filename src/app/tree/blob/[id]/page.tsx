import { redirect } from "next/navigation";
import { getFileData } from "@/lib/actions/treeActions";
import FileEditor from "@/components/fileContent/Editor";


export default async function BlobIdPage({ params }: { params: { id: string } }) {
    const fileMetaData = await getFileData(params.id)
    if (!fileMetaData.success || !fileMetaData.file) {
        redirect('/tree/main')
    }
    return (
        <>
            <FileEditor file={fileMetaData.file} content={fileMetaData.content as string} />
        </>
    )
}

