import React, { createContext, useContext, useEffect } from 'react'
import { useState } from 'react';
import { getLoggedUserData } from '../services/userServices';
import { authContext } from './AuthContext';


export const UserContext = createContext()

export default function UserContextProvider({children}) {
    // to get provided with the token
    const {token} = useContext(authContext)
    // Making States that will be provided to all UI 
    const [userData, setUserData] = useState("")

    const [isLoading, setIsLoading] = useState(false)
    
    // function to call the getLoggedUserData function and updates the state
    async function getUserData() {
        setIsLoading(true)
        try {
            // destructing data returned from the fn that calls the API 
            const {data} = await getLoggedUserData()
            console.log(data)
            setUserData(data.user)
        } catch (error) {
            console.log(error)
        }  finally {
            setIsLoading(false)
        }
    }
    // when any of the components using the context mounts the useEffect works
    // it depends that the auth context provides this context with the token
    // so we must use the authcontext that has the token
    useEffect(() => {
        if (token){
            getUserData()
        }
    }, [token])

    return (
        <UserContext.Provider value={{userData:userData, setUserData:setUserData, isLoading:isLoading}}>
            {children}
        </UserContext.Provider>
    )
}