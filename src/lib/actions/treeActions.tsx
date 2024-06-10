"use server"

import FileSystemHierarchy from "@/models/FileSystemHierarchy"
import dbConnect from "../dbConnect"
import FolderContent from "@/components/FolderContent"
import FileContent from "@/components/FileContent"
import { fileSystemDocument } from "../types/tree"
import TreeWrapper from "@/components/TreeWrapper"

export const renderTree = async (parent: string = "tree"): Promise<JSX.Element[]> => {
    await dbConnect()
    const result: fileSystemDocument[] = await FileSystemHierarchy.find({ parent })

    return result.map(file => {
        if (file.contentType == "directory") {
            // return <TreeWrapper file={file}><FolderContent file={file} renderTree={renderTree} /></TreeWrapper>
            return <FolderContent file={file} renderTree={renderTree} />
        }
        return <FileContent file={file} />
        // return <TreeWrapper file={file}><FileContent file={file} /></TreeWrapper>
    })
}
