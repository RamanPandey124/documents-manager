"use client"

import { Dispatch, createContext, useContext, useReducer } from "react"
import { counterReducer, initialState } from "./CounterReducer"
import { Action, State } from "@/lib/types/context";

interface CounterContextProps {
    state: State;
    dispatch: Dispatch<Action>;
}

export const CounterContext = createContext<CounterContextProps>({} as CounterContextProps);

export default function CounterProvider({ children }: { children: React.ReactNode }) {
    const [state, dispatch] = useReducer(counterReducer, initialState)

    return (
        <CounterContext.Provider value={{ state, dispatch }}>
            {children}
        </CounterContext.Provider>
    )
}