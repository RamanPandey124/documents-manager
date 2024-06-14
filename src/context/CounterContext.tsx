"use client"

import { createContext, useContext, useReducer } from "react"
import { counterReducer, initialState } from "./CounterReducer"

export const CounterContext = createContext()

export default function CounterProvider({ children }: { children: React.ReactNode }) {
    const [state, dispatch] = useReducer(counterReducer, initialState)

    return (
        <CounterContext.Provider value={{ state, dispatch }}>
            {children}
        </CounterContext.Provider>
    )
}