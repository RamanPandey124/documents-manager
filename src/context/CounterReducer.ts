import { resourceDocument } from "@/lib/types/tree";

export interface State {
    path: Array<resourceDocument>;
    parent: {},
    isRename: boolean,
    renameData: resourceDocument | null
}

export type Action =
    | { type: 'PATH', payload: resourceDocument }
    | { type: 'RENAME'; payload: resourceDocument }
    | { type: 'CANCEL_MODAL' }

export const initialState: State = {
    path: [],
    parent: {},
    isRename: false,
    renameData: null
};


const handlePath = (state: State, action: resourceDocument) => {
    let { path } = state

    let isExist = path.some((v) => v._id === action._id)
    if (isExist) {
        const index = path.findIndex((v) => v._id === action._id)
        path.splice(index + 1)
    }
    else {
        path.push(action)
    }

    return { ...state, path }
}


const handleRename = (state: State, action: resourceDocument) => {
    const isRename = true
    const renameData = action
    return { ...state, isRename, renameData }
}

const handleCancelModal = (state: State) => {
    state.isRename = false
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

        default:
            return state;
    }
};


// dispatch({ type: 'ADD_ITEM', payload: item });