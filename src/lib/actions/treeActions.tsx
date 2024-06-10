"use server"

import FileSystemHierarchy from "@/models/FileSystemHierarchy"
import dbConnect from "../dbConnect"
import FolderContent from "@/components/FolderContent"
import FileContent from "@/components/FileContent"
import { fileSystemDocument } from "../types/tree"
import TreeWrapper from "@/components/TreeWrapper"
import Hierarchy from "@/models/Hierarchy"
import { revalidatePath } from "next/cache"

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

interface hierarchyFormData {
    name: string;
    contentType: "directory" | "file";
    path: string;
}
export const createFolderHierachy = async (prevState: never, queryData: FormData) => {
    const rawFormData: hierarchyFormData = {
        name: queryData.get('name') as string,
        contentType: queryData.get('contentType') as "directory" | "file",
        path: queryData.get('path') as string
    }

    if (!rawFormData.name || !rawFormData.contentType || !rawFormData.path) {
        return {
            success: false,
            msg: "all field are required"
        }
    }

    try {
        await dbConnect()
        const checkDocument = await Hierarchy.find({ name: rawFormData.name, path: rawFormData.path })
        if (checkDocument.length) {
            return {
                success: false,
                msg: `${rawFormData.name} is already exits in this directory`
            }
        }
        const document = await new Hierarchy(rawFormData).save()
        // console.log(document)
        revalidatePath(rawFormData.path)

        return {
            success: true,
            msg: "new document created"
        }
    }
    catch (error) {
        return {
            success: false,
            msg: error
        }
    }

}
