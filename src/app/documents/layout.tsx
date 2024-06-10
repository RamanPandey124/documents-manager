import Loading from "@/components/Loading";
import { Suspense } from "react";

export default function DocumentLayout({
    children,
    tree,
    list
}: Readonly<{
    children: React.ReactNode;
    tree: React.ReactNode;
    list: React.ReactNode;
}>) {
    return (
        <>
            <div className="border-2 p-2 ">{children}</div>
            <div className="flex bg-slate-950 p-4 min-h-screen">
                <Suspense fallback={<Loading />}> {tree}</Suspense>
                {list}
            </div>
        </>
    )
}