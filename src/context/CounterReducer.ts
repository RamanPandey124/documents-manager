import { handleCancelModal, handleDelete, handleDublicatePaste, handleEndTransfer, handlePath, handleRename, handleTransfer } from "@/lib/handlers/StateHander";
import { Action, State } from "@/lib/types/context";

export const initialState: State = {
    path: [],
    parent: {},
    currentParent: null,
    isRename: false,
    isDelete: false,
    isTransfer: false,
    isDublicateExist: false,
};

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
        case 'DUBLICATE_PASTE':
            return handleDublicatePaste(state, action.payload)
        default:
            return state;
    }
};
