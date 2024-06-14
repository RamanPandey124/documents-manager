"use server"

import Resource from "@/models/Resource"
import dbConnect from "../dbConnect"
import { IactionResonse, ItransferDetail } from "../types/tree"
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
    id: string;
    parentId: string
}
export const DeleteFile = async (deleteDetail: IdeleteDetail): Promise<IactionResonse> => {
    try {
        const { id, parentId } = deleteDetail
        if (!id || !parentId) return { success: false, msg: "Delete item not found" }

        /** Deleting file from its parent */
        // const parentData = await Resource.findByIdAndUpdate(parentId, { $pull: { child: id } })

        /** checking no of parents in file */
        const checkParent = await Resource.findById(id).select(["parent"])


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