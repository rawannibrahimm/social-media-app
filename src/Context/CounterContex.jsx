import React, { createContext } from 'react'
import { useState } from 'react'

// making it with export to allow me use the useContext hook later on in the other components that needs the valuez it provides
export const CounterContex = createContext()

export default function CounterContexProvider({children}) {
    // creating the state(variable) that needs to be shred/provided
    const [counter, setCounter] = useState(0)
    return (
        // must send the state (variable) as a value prop so that it would be provided to others
        <CounterContex.Provider value={{counter: counter, setCounter: setCounter}} >
            {children}
        </CounterContex.Provider>
    )
}
