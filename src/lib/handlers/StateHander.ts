import { IDeletePayload, IDublicateDetails, ItransferPayload, State } from "../types/context"
import { resourceDocument } from "../types/tree"

export const handlePath = (state: State, action: resourceDocument) => {
    let { path } = state

    let isExist = path.some((v) => v?._id === action._id)
    if (isExist) {
        const index = path.findIndex((v) => v._id === action._id)
        path.splice(index + 1)
    }
    else {
        path.push(action)
    }
    state.currentParent = action._id

    return { ...state, path }
}

export const handleRename = (state: State, action: resourceDocument) => {
    const isRename = true
    const renameData = action
    return { ...state, isRename, renameData }
}

export const handleCancelModal = (state: State) => {
    state.isRename = false
    state.isDelete = false
    state.isDublicateExist = false
    return { ...state }
}

export const handleTransfer = (state: State, action: ItransferPayload) => {
    if (!state.currentParent) return { ...state }

    state.isTransfer = true
    state.Transfermethod = action.method
    state.transferDetail = {
        fileName: action.file.name,
        fileID: action.file._id,
        oldParent: action.oldParent
    }

    return { ...state }
}

export const handleEndTransfer = (state: State) => {
    state.isTransfer = false
    state.transferDetail = undefined
    state.Transfermethod = undefined
    return { ...state }
}

export const handleDelete = (state: State, action: IDeletePayload) => {
    state.isDelete = true
    state.deleteDetail = action
    return { ...state }
}

export const handleDublicatePaste = (state: State, action: IDublicateDetails) => {
    state.isDublicateExist = true
    state.DublicateDetails = action
    console.log(state)
    return { ...state }
}