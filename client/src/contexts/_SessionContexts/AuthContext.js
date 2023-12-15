import {createContext, useContext, useState} from "react";

const _AuthContext = createContext()

export function useAuthContext(){
    return useContext(_AuthContext)
}
export function AuthContext({children}){

    const [token, setToken] = useState('token token token')

    async function saveToken(){

    }
    async function loadToken(){

    }
    async function refreshToken(){

    }

    return <_AuthContext value={null}>{children}</_AuthContext>
}