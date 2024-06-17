"use server"

import fs from 'fs'
import Resource from "@/models/Resource"
import dbConnect from "../dbConnect"
import { IactionResonse, IdeleteDetail, IsafePasteResponse, ItransferData, resourceDocument } from "../types/tree"
import { revalidatePath } from "next/cache"
import path from 'path'
import { IResource } from '../types/model'
import { IDublicateDetails } from '../types/context'

export const RenameFileName = async (prevState: never, formData: FormData): Promise<IactionResonse> => {
    try {
        const id = formData.get('fileId') as string
        const name = formData.get('name') as string
        const parentId = formData.get('parentId') as string

        if (!id || !name || !parentId) return { success: false, msg: "All fields are required" }
        await dbConnect()

        const isAlreadyNameExists = await Resource.find({ name, parent: { $in: parentId } })
        if (isAlreadyNameExists.length) {
            return {
                success: false,
                msg: `${name} is already exist in this directory`
            }
        }

        const oldDocument: IResource | null = await Resource.findById(id)
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
        }

        revalidatePath(`/main/${id}`)

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

export const TransferFile = async (transferDetail: ItransferData): Promise<IactionResonse> => {
    // await new Promise((res) => setTimeout(() => res(3), 3000))

    try {
        const { childId, newParent, oldParent, method } = transferDetail
        if (!childId || !newParent || !oldParent || !method) return { success: false, msg: "Resource not provided" }

        // await dbConnect()

        if (method === 'cut') {
            await Resource.findByIdAndUpdate(childId, { $pull: { parent: oldParent } }, { new: true })
            await Resource.findByIdAndUpdate(oldParent, { $pull: { childId } }, { new: true })
            await Resource.findByIdAndUpdate(childId, { $push: { parent: newParent } }, { new: true })
            await Resource.findByIdAndUpdate(newParent, { $push: { childId } }, { new: true })
        }
        else {
            const mainFile = await Resource.findById(childId) as IResource
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
                await Resource.findOneAndUpdate({ parent: { $in: childId } }, { $push: { parent: copyFile._id } }, { new: true })
            }
            await Resource.findByIdAndUpdate(newParent, { $push: { child: copyFile._id } }, { new: true })
        }

        revalidatePath(`/main`)
        revalidatePath(`/main/${newParent}`)
        revalidatePath(`/main/${oldParent}`)

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

        revalidatePath(`/main`)
        revalidatePath(`/main/${parentId}`)

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

export const checkDuplicatePaste = async (transferDetail: ItransferData): Promise<IsafePasteResponse> => {
    try {
        const { childId, childName, newParent, oldParent, method } = transferDetail
        if (!childId || !childName || !newParent || !oldParent || !method) return { success: false, msg: "Resource not provided" }

        const isAlreadyNameExists = await Resource.find({ name: childName, parent: { $in: newParent } })
        if (isAlreadyNameExists.length) {
            console.log('inds')
            let existingDetail: IResource = isAlreadyNameExists[0]
            return {
                success: false,
                msg: `This Destination Already contents a ${existingDetail.contentType} with ${childName} name`,
                isDuplicateExist: true,
                existingDetail,
                providedDetail: transferDetail
            }
        }

        return TransferFile(transferDetail)
    }
    catch (error) {
        console.log(error)
        return {
            success: false,
            msg: 'Server Error!'
        }
    }
}

export const ReplaceFile = async (allowDublicateDetail: IDublicateDetails): Promise<IactionResonse> => {
    try {
        const { existingDetail, providedDetail } = allowDublicateDetail
        const deleteDetail = {
            file: existingDetail,
            parentId: providedDetail.newParent as string
        }
        const deleteReturn = await DeleteFile(deleteDetail)
        const transReturn = await TransferFile(providedDetail)

        console.log({ deleteReturn, transReturn })
        if (!deleteReturn.success && !transReturn.success) {
            return {
                success: false,
                msg: "Error in replacing resources"
            }
        }
        return {
            success: true,
            msg: "Item replaced"
        }

    } catch (error) {
        console.log(error)
        return {
            success: false,
            msg: "Server error!"
        }
    }
}