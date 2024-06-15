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

        await Resource.findByIdAndUpdate(id, { $set: { name } })

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

        if (child === newParent) {
            return {
                success: true,
                msg: 'not inserting in itself'
            }
        }
        await dbConnect()

        if (method === 'cut') {
            const childData = await Resource.findByIdAndUpdate(child, { $pull: { parent: oldParent } }, { new: true })
            const oldParentData = await Resource.findByIdAndUpdate(oldParent, { $pull: { child } }, { new: true })
            const RevisedchildData = await Resource.findByIdAndUpdate(child, { $push: { parent: newParent } }, { new: true })
            const newParentData = await Resource.findByIdAndUpdate(newParent, { $push: { child } }, { new: true })
            // console.log({ child, newParent, oldParent, method, childData, newParentData, oldParentData, RevisedchildData })
        }
        else {
            // console.log({ child, newParent, method, oldParent })
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
            // console.log({ copyFileData })
            const copyFile = await new Resource(copyFileData).save()
            // console.log(copyFile)
            if (copyFile.child && copyFile.child.length) {
                const childs = await Resource.findOneAndUpdate({ parent: { $in: child } }, { $push: { parent: copyFile._id } }, { new: true })
                // console.log({childs})
            }
            const parent = await Resource.findByIdAndUpdate(newParent, { $push: { child: copyFile._id } }, { new: true })
            // console.log({parent})
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
        console.log('originalfile =>', file)
        console.log('originalParent =>', parentId)

        /** if file exist in only one parent, just deleting it as it has no reference to any other folder */
        await dbConnect()

        // let a = 1
        const recursive = async (file: resourceDocument, parentId: string) => {
            // console.log({ a, file, parentId })

            if (file.parent && file.parent.length === 1) {
                // console.log(a, 'inside =>', file.parent.length)
                await Resource.findByIdAndDelete(file._id)
                if (file.contentType === 'file') {
                    // console.log(a, { name: file.name }, file.contentType)
                    // console.log(a, { file, name: 'file check' })
                    fs.unlinkSync(file.filePath as string)
                }
                else if (file.child && file.child.length) {
                    // console.log(a, 'inside child', file, file.name, file.child, file.child.length)

                    const childs: resourceDocument[] = await Resource.find({ parent: { $in: file._id } })
                    // console.log(a, { childs, file, name: file.name })
                    childs.forEach(child => recursive(child, file._id))
                }
            }
            else {
                await Resource.findByIdAndUpdate(file._id, { $pull: { parent: parentId } })
            }
            // a++
        }

        await recursive(file, parentId)

        // console.log(file)
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