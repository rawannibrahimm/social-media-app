// Making this component to use it as a wrapper to the main layout 
import React, { useContext, useEffect } from 'react'
// import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authContext } from '../Context/AuthContext';


export default function AppProtectedRoutes( {children} ) {
    const navigate = useNavigate();
    // old way before state management using context
    // const [token, setToken] = useState(localStorage.getItem("userToken"));
    const {token} = useContext(authContext)
    useEffect(() =>{
        if(!token) {
            navigate('/login')
        }
    }, [navigate , token])
    return (
        <>
            {children}
        </>
    )
}
