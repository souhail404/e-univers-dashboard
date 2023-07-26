import { useState } from "react"
import { useAuth } from "../hooks/useAuth"

export const useLogin = ()=>{
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const { user, dispatch } = useAuth() 
    
    const login = async (data)=>{
        setIsLoading(true)
        setError(null)

        const response = await fetch("http://localhost:4000/api/user/admin-login/", {
            method:"POST",
            headers:{
                "Content-Type":"application/json",
            },
            body:data
        });
        const json = await response.json();

        if(!response.ok){
            setIsLoading(false)
            setError(json.error)
        }
        if(response.ok){
            localStorage.setItem("user", JSON.stringify(json))
            dispatch({type:'LOGIN', payload: json})
            setIsLoading(false)
        }   
    }

    return {login , isLoading, error}
}