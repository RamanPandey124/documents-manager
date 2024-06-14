import { Action, IDeletePayload, ItransferPayload, State } from "@/lib/types/context";
import { resourceDocument } from "@/lib/types/tree";

export const initialState: State = {
    path: [],
    parent: {},
    currentParent: null,
    isRename: false,
    isDelete: false,
    isTransfer: false
};

const handlePath = (state: State, action: resourceDocument) => {
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

const handleRename = (state: State, action: resourceDocument) => {
    const isRename = true
    const renameData = action
    return { ...state, isRename, renameData }
}

const handleCancelModal = (state: State) => {
    state.isRename = false
    state.isDelete = false
    return { ...state }
}

const handleTransfer = (state: State, action: ItransferPayload) => {
    if (!state.currentParent) return { ...state }

    state.isTransfer = true
    state.Transfermethod = action.method
    state.transferDetail = {
        fileID: action.file._id,
        newParent: state.currentParent,
        oldParent: action.oldParent
    }
    console.log(state)

    return { ...state }
}

const handleEndTransfer = (state: State) => {
    state.isTransfer = false
    state.transferDetail = undefined
    state.Transfermethod = undefined
    console.log(state)
    return { ...state }
}

const handleDelete = (state: State, action: IDeletePayload) => {
    // console.log(action)
    state.isDelete = true
    state.deleteDetail = action
    return { ...state }
}

export const counterReducer = (state: State, action: Action): State => {
    switch (action.type) {
        case 'PATH':
            return handlePath(state, action.payload);
        case 'RENAME':
            return handleRename(state, action.payload);
        case 'CANCEL_MODAL':
            return handleCancelModal(state);
        case 'TRANSFER':
            return handleTransfer(state, action.payload);
        case 'END_TRANSFER':
            return handleEndTransfer(state);
        case "DELETE":
            return handleDelete(state, action.payload);
        default:
            return state;
    }
};


// dispatch({ type: 'ADD_ITEM', payload: item });