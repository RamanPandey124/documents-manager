import { renderTree } from "@/lib/actions/treeActions";


export default async function TreePage() {
    return (
        <div className="shadow-sm shadow-red-100 px-2">
            {renderTree()}
        </div>
    )
}


