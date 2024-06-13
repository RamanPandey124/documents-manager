"use server"

import fs from 'fs'
import path from 'path';
import dbConnect from "../dbConnect"
import Resource from "@/models/Resource";
import { revalidatePath } from "next/cache"
import { IdbResource, IgetFileData, resourceDocument } from '../types/tree'
import { permanentRedirect, redirect } from 'next/navigation';


export const createDbResource = async (prevState: never, queryData: FormData) => {
    /**Getting form values */
    const name = queryData.get('name') as string | undefined
    const contentType = queryData.get('contentType') as "directory" | "file"
    const parentId = queryData.get('parentId') as string
    const formType = queryData.get('formType') as "upload" | "create"
    const file: File | null = queryData.get('file') as unknown as File;
    try {

        /**Checking form inputs availability */
        if (!contentType || !parentId || (formType === 'create' && !name) || (formType === 'upload' && file.name === 'undefined')) {
            return {
                success: false,
                msg: "all field are required"
            }
        }
        let rawFormData: IdbResource = {
            contentType,
            parent: [parentId]
        }

        /** checking if resource name already exist in current directory */
        if (formType === 'upload') {
            rawFormData.name = file.name
        }
        else {
            rawFormData.name = name
        }

        await dbConnect()
        const checkDocument = await Resource.find({ name: rawFormData.name, parent: { $in: parentId } })
        if (checkDocument.length) {
            return {
                success: false,
                msg: `${rawFormData.name} is already exits in this directory`
            }
        }

        /**Create or upload a uniqueFile in the public/uploads folder if contentType is "file" */
        if (formType === 'upload') {
            const bytes = await file.arrayBuffer();
            const buffer = Buffer.from(bytes);
            const uniqueName = `${Date.now()}-${file.name}`
            const filePath = path.join('public/uploads/', uniqueName);
            fs.writeFileSync(filePath, buffer);
            rawFormData.uniqueName = uniqueName;
            rawFormData.filePath = filePath
        }
        else {
            if (contentType === 'file') {
                const uniqueName = `${Date.now()}-${name}`
                const filePath = path.join('public/uploads/', uniqueName);
                fs.writeFileSync(filePath, "");
                rawFormData.uniqueName = uniqueName;
                rawFormData.filePath = filePath
            }
        }

        /**create new Resource in the db and push its _id in the current directory child array */
        const childResource = await new Resource(rawFormData).save()
        await Resource.findByIdAndUpdate(
            parentId,
            { $push: { child: childResource._id } },
            { new: true }
        )

        revalidatePath('/tree/main')
        revalidatePath(`/tree/main/${parentId}`)
    }
    catch (error) {
        console.log(error)
        return {
            success: false,
            msg: "Server Error !"
        }
    }

    redirect(`/tree/main/${parentId}`)

}

export const getDriveContents = async (parentId: string): Promise<resourceDocument[]> => {
    // await new Promise(resolve => setTimeout(resolve, 2000));
    await dbConnect()
    return await Resource.find({ parent: { $in: parentId } })
}

export const getFileData = async (id: string): Promise<IgetFileData> => {
    try {
        await dbConnect()

        let file = await Resource.findById(id) as resourceDocument
        if (!file || !file.filePath) return { success: false, msg: 'not any file exists' }

        const content = fs.readFileSync(path.resolve(file.filePath), 'utf-8');

        file = JSON.parse(JSON.stringify(file))
        return {
            success: true,
            msg: "file content",
            file,
            content
        }

    } catch (error) {
        return {
            success: false,
            msg: "Server Error !"
        }

    }
}

export const updateFileContent = async (prevState: never, formData: FormData) => {
    try {
        const content = formData.get('content') as string
        const uniquePath = formData.get('uniquePath') as string
        const fileId = formData.get('fileId') as string
        if (!content || !uniquePath || !fileId) return { success: false, msg: "Unable to update changes" }

        fs.writeFileSync(uniquePath, content)
        revalidatePath(`/tree/blob/${fileId}`)
        return { success: true, msg: "Updated successfully..." }

    } catch (error) {
        return { success: false, msg: "Server Error !" }
    }
}