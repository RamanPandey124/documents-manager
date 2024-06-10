"use client"

import { useState } from "react"

export default function Parent({ children }) {
    const [state, setState] = useState(false)
    return (
        <div>
            <button onClick={() => setState(!state)}>{state ? "clicked" : "click"}</button>

            {state && children}

        </div>
    )
}