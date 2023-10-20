import { useState } from "react"
import { useAuth } from "../hooks/useAuth"
import { toast } from "react-toastify"
import BASE_URL from "../APIurl"

export const useLogin = ()=>{
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const { user, dispatch } = useAuth() 
    
    const login = async (data)=>{
        setIsLoading(true)
        setError(null)
        const toastId = toast.loading(`Login`);
        const response = await fetch(`${BASE_URL}api/user/admin-login/`, {
            method:"POST",
            headers:{
                "Content-Type":"application/json",
            },
            body:data
        });
        const json = await response.json();

        if(!response.ok){
            setIsLoading(false)
            setError(json.message)
            toast.update(toastId, {render: `${json.message}`, type: "error", isLoading: false, autoClose:5000});
        }
        if(response.ok){
            localStorage.setItem("user", JSON.stringify(json))
            dispatch({type:'LOGIN', payload: json})
            setIsLoading(false)
            toast.update(toastId, {render: "loging success", type: "success", isLoading: false, autoClose:5000});
        }   
    }

    return {login , isLoading, error}
}