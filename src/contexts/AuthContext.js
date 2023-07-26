import React, { useState, useContext, useReducer, useEffect } from 'react';

export const AuthContext = React.createContext();

export function authReducer(state, action) {
    switch(action.type){
        case 'LOGIN':
            return {user:action.payload}
        case 'LOGOUT':
            return {user:null}
        default:
            return state
    }
}

export function AuthProvider({ children }) {
    const [state, dispatch] = useReducer(authReducer, {
        user: JSON.parse(localStorage.getItem('user')) || null
    }); 
    useEffect(()=>{
        const user= JSON.parse(localStorage.getItem('user'))
        if(user){
            dispatch({type: 'LOGIN', payload: user})
        }
    },[])
    console.log('user' , state)

    return <AuthContext.Provider value={{...state , dispatch}} >{children}</AuthContext.Provider>;
}
