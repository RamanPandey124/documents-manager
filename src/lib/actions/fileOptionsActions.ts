"use server"

import Resource from "@/models/Resource"
import dbConnect from "../dbConnect"
import { IactionResonse } from "../types/tree"
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