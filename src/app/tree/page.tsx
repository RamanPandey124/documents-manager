import File from "@/components/File";
import Folder from "@/components/Folder";
import { data } from "@/lib/data"
import { documentSchema } from "@/lib/types/tree";

export default function tree() {
    return (
        <div>
            {renderTree(data)}
        </div>
    )
}

const renderTree = (files: documentSchema[], path?: string) => {
    const folderFiles = files.filter(file => {
        path = path?.includes('/') ? path : file.path
        return file.path === path
    })

    return folderFiles.map(file => {
        if (file.contentType === "directory") {
            return <Folder key={file.id} file={file} renderTree={renderTree} files={files} />
        }
        return <File key={file.id} name={file.name} />
    })

}