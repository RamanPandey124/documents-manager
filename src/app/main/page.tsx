import GetEntries from "@/components/tuesday/GetEntries"
import { Suspense } from "react"

export default function MainPage() {
    const root = process.env.ROOT_ID as string
    return (
        <Suspense fallback={"Loading..."}>
            <GetEntries path={root} />
        </Suspense>
    )

}