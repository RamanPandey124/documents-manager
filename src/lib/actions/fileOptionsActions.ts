"use server"

import fs from 'fs'
import Resource from "@/models/Resource"
import dbConnect from "../dbConnect"
import { IactionResonse, ItransferDetail, resourceDocument } from "../types/tree"
import { revalidatePath } from "next/cache"

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
        const childData = await Resource.findByIdAndUpdate(child, { $push: { parent: newParent } }, { new: true })
        const newParentData = await Resource.findByIdAndUpdate(newParent, { $push: { child } }, { new: true })

        if (method === 'cut') {
            const RevisedchildData = await Resource.findByIdAndUpdate(child, { $pull: { parent: oldParent } }, { new: true })
            const oldParentData = await Resource.findByIdAndUpdate(oldParent, { $pull: { child } }, { new: true })
            // console.log({ child, newParent, oldParent, method, childData, newParentData, oldParentData, RevisedchildData })
        }
        else {
            // console.log({ child, newParent, oldParent, method, childData, newParentData })
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
interface IdeleteDetail {
    file: resourceDocument,
    parentId: string
}

export const DeleteFile = async (deleteDetail: IdeleteDetail): Promise<IactionResonse> => {
    try {
        await new Promise((res) => setTimeout(() => res(3), 3000))

        const { file, parentId } = deleteDetail
        if (!file._id || !parentId) return { success: false, msg: "Delete item not found" }

        /** if file exist in only one parent, just deleting it as it has no reference to any other folder */
        await dbConnect()

        const recursive = async (file: resourceDocument, parentId: string) => {
            console.log({ file, parentId })

            if (file.parent && file.parent.length === 1) {
                await Resource.findByIdAndDelete(file._id)
                if (file.contentType === 'files') {
                    fs.unlinkSync(file.filePath as string)
                }
                else if (file.child && file.child.length) {
                    const childs: resourceDocument[] = await Resource.find({ parent: { $in: parentId } })
                    childs.forEach(child => recursive(child, file._id))
                }
            }
            else {
                await Resource.findByIdAndUpdate(file._id, { $pull: { parent: parentId } })
            }

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