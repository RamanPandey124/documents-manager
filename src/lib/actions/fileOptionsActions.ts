"use server"

import fs from 'fs'
import Resource from "@/models/Resource"
import dbConnect from "../dbConnect"
import { IactionResonse, IdeleteDetail, ItransferDetail, resourceDocument } from "../types/tree"
import { revalidatePath } from "next/cache"
import path from 'path'
import { IResource } from '../types/model'

export const RenameFileName = async (prevState: never, formData: FormData): Promise<IactionResonse> => {
    try {
        const id = formData.get('fileId') as string
        const name = formData.get('name') as string

        if (!id || !name) return { success: false, msg: "All fields are required" }
        await dbConnect()

        const oldDocument: IResource | null = await Resource.findById(id)
        // const resource: IResource | null = await Resource.findByIdAndUpdate(id, { $set: { name } }, { new: true })
        if (!oldDocument) {
            return {
                success: false,
                msg: 'file not exist to rename'
            }
        }

        if (oldDocument.contentType === 'file' && oldDocument.filePath) {
            const uniqueName = `${Date.now()}-${name}`
            const filePath = path.join('public/uploads/', uniqueName);
            await fs.promises.rename(oldDocument.filePath, filePath)
            const newDocument = await Resource.findByIdAndUpdate(id, { $set: { name, uniqueName, filePath } }, { new: true })
            console.log({ newDocument })
        }
        else {
            const resource = await Resource.findByIdAndUpdate(id, { $set: { name } }, { new: true })
            console.log({ resource })
        }

        revalidatePath(`/tree/main/${id}`)

        return {
            success: true,
            msg: "Name update !"
        }
    }
    catch (error) {
        return {
            success: false,
            msg: "server error !"
        }

    }
}

export const TransferFile = async (transferDetail: ItransferDetail): Promise<IactionResonse> => {
    // await new Promise((res) => setTimeout(() => res(3), 3000))

    try {
        const { child, newParent, oldParent, method } = transferDetail
        if (!child || !newParent || !oldParent || !method) return { success: false, msg: "Resource not provided" }

        await dbConnect()

        if (method === 'cut') {
            await Resource.findByIdAndUpdate(child, { $pull: { parent: oldParent } }, { new: true })
            await Resource.findByIdAndUpdate(oldParent, { $pull: { child } }, { new: true })
            await Resource.findByIdAndUpdate(child, { $push: { parent: newParent } }, { new: true })
            await Resource.findByIdAndUpdate(newParent, { $push: { child } }, { new: true })
        }
        else {
            const mainFile = await Resource.findById(child) as IResource
            let copyFileData: IResource = {
                name: mainFile.name,
                contentType: mainFile.contentType,
                child: mainFile.child,
                parent: [newParent]
            }

            if (mainFile.contentType === 'file') {
                const uniqueName = `${Date.now()}-${mainFile.name}`
                const filePath = path.join('public/uploads/', uniqueName);
                fs.copyFileSync(mainFile.filePath, filePath)
                copyFileData.uniqueName = uniqueName
                copyFileData.filePath = filePath
            }

            const copyFile = await new Resource(copyFileData).save()

            if (copyFile.child && copyFile.child.length) {
                await Resource.findOneAndUpdate({ parent: { $in: child } }, { $push: { parent: copyFile._id } }, { new: true })
            }
            await Resource.findByIdAndUpdate(newParent, { $push: { child: copyFile._id } }, { new: true })
        }

        revalidatePath(`/tree/main`)
        revalidatePath(`/tree/main/${newParent}`)
        revalidatePath(`/tree/main/${oldParent}`)

        return {
            success: true,
            msg: 'Resources Transfered !'
        }
    }
    catch (error) {
        console.log(error)
        return {
            success: false,
            msg: "Server Error!"
        }
    }

}

export const DeleteFile = async (deleteDetail: IdeleteDetail): Promise<IactionResonse> => {
    try {
        const { file, parentId } = deleteDetail
        if (!file._id || !parentId) return { success: false, msg: "Delete item not found" }

        await dbConnect()

        const recursive = async (file: resourceDocument, parentId: string) => {

            if (file.parent && file.parent.length === 1) {
                await Resource.findByIdAndDelete(file._id)

                if (file.contentType === 'file') {
                    fs.unlinkSync(file.filePath as string)
                }
                else if (file.child && file.child.length) {
                    const childs: resourceDocument[] = await Resource.find({ parent: { $in: file._id } })
                    childs.forEach(child => recursive(child, file._id))
                }
            }
            else {
                await Resource.findByIdAndUpdate(file._id, { $pull: { parent: parentId } })
            }
        }

        await recursive(file, parentId)

        /** Deleting file from its parent */
        await Resource.findByIdAndUpdate(parentId, { $pull: { child: file._id } })

        revalidatePath(`/tree/main`)
        revalidatePath(`/tree/main/${parentId}`)

        return {
            success: true,
            msg: 'item deleted'
        }

    }
    catch (error) {
        console.log(error)
        return {
            success: false,
            msg: 'server error'
        }

    }
}