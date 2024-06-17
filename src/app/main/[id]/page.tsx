import GetEntries from "@/components/tuesday/GetEntries";
import { Suspense } from "react";


export default async function MainIdPage({ params }: { params: { id: string } }) {
    return (
        <Suspense fallback={"Loading..."}>
            <GetEntries path={params.id} />
        </Suspense>
    )
}
