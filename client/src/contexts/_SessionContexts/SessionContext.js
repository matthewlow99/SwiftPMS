import {createContext, useContext, useLayoutEffect, useState} from "react";
import {apiRequest} from "../../helpers/api/apiFunctionHelpers";
import {useNavigate} from "react-router-dom";
import LoadingScreen from "../../components/Loading/LoadingScreen";

const _SessionContext = createContext()

export function useSessionContext(){
    return useContext(_SessionContext)
}
export function SessionContext({children}){



    const nav = useNavigate();
    // const [loading, isLoading] = useState(true)

    // useLayoutEffect(() => { validateToken().then(() => {isLoading(false)}) }, []);
    async function validateToken(){
        const accessToken = localStorage.getItem('accessToken')
        const response = await apiRequest('pub/verify_token', {accessToken}, true)
        if(response.status == 200)
            nav('/customers')
        else {
            clearTokens().then(() => {nav('/login')})
        }
    }
    async function login(email, password){
        await apiRequest('pub/login', {email, password}, false, true).then(data => {
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

    // if(loading) return <LoadingScreen />
    return <_SessionContext.Provider value={{checkLoginStatus, login, clearTokens, validateToken}}>{children}</_SessionContext.Provider>
}