import { data } from "@/lib/data"
import dbConnect from "@/lib/dbConnect"
import FileSystemHierarchy from "@/models/FileSystemHierarchy"

const postData = async () => {
    await dbConnect()
    const files = await FileSystemHierarchy.find()
    return files
}
export default async function database() {
    const result = await postData()

    return (
        <div>
            <p>{result.length}</p>
            {result.map(v => <div>{JSON.stringify(v, null, 2)}</div>)}
        </div>
    )

}