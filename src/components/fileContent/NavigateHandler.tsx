"use client"

import { CounterContext } from "@/context/CounterContext";
import { resourceDocument } from "@/lib/types/tree";
import { memo, useContext, useEffect } from "react";

function NavigateHandler({ parent }: { parent: resourceDocument }) {
    let isDispatch = false
    const { state, dispatch } = useContext(CounterContext)

    useEffect(() => {
        if (!isDispatch) {
            dispatch({ type: 'PATH', payload: parent })
        }
        isDispatch = true
    }, [])

    return null
}

export default memo(NavigateHandler)