import { Suspense } from "react";
import Loading from "../reuseable/Loading";
import GetEntries from "./GetEntries";

export default function RenderResource({ parentId }: { parentId: string }) {

    return (
        <div className="">
            <div className=" min-h-24 bg-zinc-800 pt-4 space-y-4">
                <h1 className="px-4">My Files</h1>
                <Suspense fallback={<Loading />}>
                    <table className="w-full divide-y-2 divide-zinc-500 shadow-sm shadow-gray-400">
                        <thead className=" bg-zinc-600">
                            <tr className="text-left">
                                <th className="px-4">Name</th>
                                <th>Type</th>
                                <th>Created</th>
                            </tr>
                        </thead>
                        <GetEntries path={parentId} />
                    </table>
                </Suspense>
            </div>
        </div>
    )

}

