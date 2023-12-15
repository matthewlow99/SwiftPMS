import {createContext, useContext, useState} from "react";
import {apiRequest} from "../../helpers/api/apiFunctionHelpers";
import {useNavigate} from "react-router-dom";

const _SessionContext = createContext()

export function useSessionContext(){
    return useContext(_SessionContext)
}
export function SessionContext({children}){



    const nav = useNavigate();

    async function login(email, password){
        await apiRequest('pub/login', {email, password}).then(data => {
            if(data.responseStatus === 200) {
                saveTokens(data.accessToken, data.refreshToken)
                nav('/customers')
            }
        })
    }
    async function saveTokens(access, refresh){
        localStorage.setItem('accessToken', access);
        localStorage.setItem('refreshToken', refresh);
    }
    async function clearTokens(){
        localStorage.clear()
    }
    function checkLoginStatus(){
        return !!localStorage.getItem('accessToken');
    }

    return <_SessionContext.Provider value={{checkLoginStatus, login, clearTokens}}>{children}</_SessionContext.Provider>
}