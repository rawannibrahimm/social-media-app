import React, { createContext } from 'react'
import { useState } from 'react';


export const authContext = createContext()

export default function AuthContextProvider({children}) {
    const [token, setToken] = useState(localStorage.getItem("userToken"));

    return (
        <authContext.Provider value={{token:token , setToken:setToken}}>
            {children}
        </authContext.Provider>
    )
}
