

import DeleteFormSelector from "./DeleteFormSelector"
import DuplicateFormSelector from "./DuplicateFormSelector"
import RenameFormSelector from "./RenameFormSelector"

export default function Global() {

    return (
        <>
            <RenameFormSelector />
            <DeleteFormSelector />
            <DuplicateFormSelector />
        </>
    )
}
