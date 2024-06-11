
import dbConnect from '@/lib/dbConnect'
import { resourceDocument } from '@/lib/types/tree'
import Resource from '@/models/Resource'
import { type NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams
    const parentId = searchParams.get('parent')

    try {
        await dbConnect()
        const folders: resourceDocument[] = await Resource
            .find({ parent: { $in: [parentId] }, contentType: "directory" })
            .select(["name", "_id"])
        return Response.json({
            success: 'true',
            msg: "new folders",
            folders
        })

    } catch (error) {
        return Response.json({
            success: false,
            msg: error
        })

    }
}