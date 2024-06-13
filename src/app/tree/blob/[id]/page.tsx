import { redirect } from "next/navigation";
import { getFileData } from "@/lib/actions/treeActions";


export default async function BlobIdPage({ params }: { params: { id: string } }) {
    const fileMetaData = await getFileData(params.id)
    if (!fileMetaData.success) {
        redirect('/tree/main')
    }

    return (
        <div>
            <textarea className="bg-gray-600 w-full h-32" defaultValue={fileMetaData.content} />
        </div>
    )
}

