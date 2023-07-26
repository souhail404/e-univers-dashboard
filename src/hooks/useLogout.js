import { useAuth } from "../hooks/useAuth"

export const useLogout = ()=>{
   
    const { dispatch } = useAuth() 

    const logout = ()=>{
        localStorage.removeItem("user")
        dispatch({type:'LOGOUT'})
    }   

    return {logout}
}