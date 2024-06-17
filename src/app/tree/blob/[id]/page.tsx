import { redirect } from "next/navigation";
import { getFileData } from "@/lib/actions/treeActions";
import FileEditor from "@/components/fileContent/Editor";
import NavigateHandler from "@/components/fileContent/NavigateHandler";


export default async function BlobIdPage({ params }: { params: { id: string } }) {
    const fileMetaData = await getFileData(params.id)
    if (!fileMetaData.success || !fileMetaData.file) {
        redirect('/tree/main')
    }
    return (
        <>
            <NavigateHandler parent={fileMetaData.file} />
            <FileEditor file={fileMetaData.file} content={fileMetaData.content as string} />
        </>
    )
}

