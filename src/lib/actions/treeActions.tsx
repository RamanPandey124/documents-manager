"use server"

import dbConnect from "../dbConnect"
import Resource from "@/models/Resource";
import { revalidatePath } from "next/cache"

export const createDbResource = async (prevState: never, queryData: FormData) => {

    const name = queryData.get('name') as string
    const contentType = queryData.get('contentType') as "directory" | "file"
    const parentId = queryData.get('parentId') as string


    if (!name || !contentType || !parentId) {
        return {
            success: false,
            msg: "all field are required"
        }
    }

    try {
        await dbConnect()
        const checkDocument = await Resource.find({ name: name, parent: { $in: parentId } })
        if (checkDocument.length) {
            return {
                success: false,
                msg: `${rawFormData.name} is already exits in this directory`
            }
        }

        const childResource = await new Resource({
            name,
            contentType,
            parent: [parentId]
        }).save()
        await Resource.findByIdAndUpdate(
            parentId,
            { $push: { child: childResource._id } },
            { new: true }
        )
        revalidatePath('/tree/main')
        revalidatePath(`/tree/main/${parentId}`)

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

