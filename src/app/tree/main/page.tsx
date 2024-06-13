import GetEntries from "@/components/tuesday/GetEntries"
import { Suspense } from "react"

export default function MainPage() {
    const id = "6667dedc0dec98e677cf693a"
    return (
        <Suspense fallback={"Loading..."}>
            <GetEntries path={id} />
        </Suspense>
    )

}