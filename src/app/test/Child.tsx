
import dbConnect from "@/lib/dbConnect"
import { fileSystemDocument } from "@/lib/types/tree"
import FileSystemHierarchy from "@/models/FileSystemHierarchy"
import { useState } from "react"


const testFetch = async (parent: string = "tree/public") => {
    await dbConnect()
    const result: fileSystemDocument[] = await FileSystemHierarchy.find({ parent })
    return result
}


export default async function Child({ }) {
    const result = await testFetch()
    console.log(result)

    return (
        <div>
            {result.map(v=><div>{v.name}</div>)}
        </div>
    )
}