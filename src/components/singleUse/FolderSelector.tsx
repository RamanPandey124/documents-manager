import { getFolderResponseType, pathTrackerType, rootFolderType } from "@/lib/types/tree";
import { Suspense, useEffect, useState } from "react"
import { IoFolder } from "react-icons/io5";
import { FaArrowLeft } from "react-icons/fa";

const rootFolder: rootFolderType = {
    name: "root",
    _id: "6667dedc0dec98e677cf693a"
}


const intialPathTracker: pathTrackerType = {
    names: [rootFolder.name],
    paths: [rootFolder._id]
}

export default function FolderSelector({ handleFolder }: { handleFolder: (id: string) => void }) {

    const [currentfolder, setCurrent] = useState<rootFolderType[]>([])
    const [pathTracker, setPathTracker] = useState(intialPathTracker)

    const handleHistory = () => {
        const { names, paths } = pathTracker
        const previousFolder = {
            name: names[names.length - 2],
            _id: paths[paths.length - 2]
        }
        names.pop()
        paths.pop()
        setPathTracker({ names, paths })
        getNewFolders(previousFolder)
    }

    const getNewFolders = async (Currentfolder: rootFolderType, isTrack: boolean = false) => {
        const { _id, name } = Currentfolder

        const resonse = await fetch(`http://localhost:3000/api/get_folders?parent=${_id}`)
        const result: getFolderResponseType = await resonse.json()

        if (result.success) {
            if (isTrack) {
                setPathTracker({
                    names: [...pathTracker.names, name],
                    paths: [...pathTracker.paths, _id]
                })
            }
            setCurrent(result.folders)
            handleFolder(_id)
        }
    }

    useEffect(() => {
        getNewFolders(rootFolder)
    }, [])

    return (
        <>
            <div className="flex ">
                {pathTracker.paths.length > 1 &&
                    <FaArrowLeft onClick={handleHistory} className="relative top-1 hover:bg-gray-500" />}
                <span className="mx-4 text-yellow-500">{pathTracker.names.join('/')}</span>
            </div>
            <Suspense fallback="loading...">
                <div className="flex">
                    {currentfolder?.map((folder) => {
                        return (
                            <div
                                onClick={() => getNewFolders(folder, true)}
                                className=" hover:bg-gray-500 mx-2 text-center first:rounded-md cursor-pointer">
                                <IoFolder className="h-7 w-7 mx-auto" />
                                <p className="line-clamp-1 w-12">{folder.name}</p>
                            </div>
                        )
                    })}
                </div >
            </Suspense>
        </>
    )
}