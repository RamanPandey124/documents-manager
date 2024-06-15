// app/api/download/route.ts
import fs from 'fs';
import { NextRequest } from 'next/server';
import path from 'path';

export async function GET(request: NextRequest) {
    try {
        const fileLocation = request.nextUrl.searchParams.get('path')
        if (!fileLocation) {
            return new Response('Error downloading file', { status: 500 })
        }
        const filePath = path.join(process.cwd(), fileLocation);

        const data = await fs.promises.readFile(filePath);
        const filename = path.basename(filePath).split("-")[1]

        return new Response(data, {
            headers: {
                'Content-Disposition': `attachment; filename=${filename}`
            },
        });
    } catch (error) {
        console.error(error);
        return new Response('Error downloading file', { status: 500 });
    }
}
