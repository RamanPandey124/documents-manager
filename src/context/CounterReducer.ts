import path from "path";

export interface State {
    path: Array<any>;
    parent: {}
}

export type Action =
    | { type: 'PATH', payload: object }
    | { type: 'DECREMENT' }
    | { type: 'ADD_ITEM'; payload: string };

export const initialState: State = {
    path: [],
    parent: {}
};

const handlePath = (state: State, action) => {
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

export const counterReducer = (state: State, action: Action): State => {
    switch (action.type) {
        case 'PATH':
            return handlePath(state, action.payload);

        case 'DECREMENT':
            return { ...state, counter: state.counter - 1 };
        case 'ADD_ITEM':
            return { ...state, items: [...state.items, action.payload] };
        default:
            return state;
    }
};


// dispatch({ type: 'ADD_ITEM', payload: item });