import dbConnect from "@/lib/dbConnect"
import { hierarchyDocument } from "@/lib/types/tree"
import Hierarchy from "@/models/Hierarchy"
import Link from "next/link"
import DirectoryMetaData from "./DirectoryMetadata"
import FileMetaData from "./FileMetadata"
import { Suspense } from "react"
import Loading from "../Loading"

const getDriveContents = async (path: string) => {
    await dbConnect()
    return await Hierarchy.find({ path })
}


export default async function RenderTree({ path }: { path: string }) {

    return (
        <div className="">
            <div className=" min-h-24 bg-zinc-800 pt-4 space-y-4">
                <h1 className="px-4">My Files</h1>
                <Suspense fallback={<Loading />}>
                    <table className="w-full divide-y-2 divide-zinc-500 shadow-sm shadow-gray-400">
                        <thead className=" bg-zinc-600">
                            <tr className="text-left">
                                <th className="px-4">Name</th>
                                <th>Type</th>
                                <th>Created</th>
                            </tr>
                        </thead>
                        <GetEntries path={path} />
                    </table>
                </Suspense>
            </div>
        </div>
    )
}


async function GetEntries({ path }: { path: string }) {
    const Entries: hierarchyDocument[] = await getDriveContents(path)

    return <tbody className="divide-y-2 divide-zinc-500 ">
        {Entries.map(file => {
            if (file.contentType === 'directory') {
                return <DirectoryMetaData file={file} />
            }
            return <FileMetaData file={file} />
        })}
    </tbody>
}