import {createContext, useContext, useEffect, useState} from "react";
import {apiRequest} from "../../helpers/api/apiFunctionHelpers";
import LoadingScreen from "../../components/Loading/LoadingScreen";
import {useNavigate} from "react-router-dom";

const _ContactContext = createContext();

export function useContactListContext(){
    return useContext(_ContactContext)
}
export function ContactContext({children}){

    const [loading, isLoading] = useState(true)
    const [contacts, setContacts] = useState([])
    const [customers, setCustomers] = useState([])
    const nav = useNavigate();
    async function load(){
        isLoading(true)
        await Promise.all([
            apiRequest('customer/list').then(data => {setCustomers(data)}).catch(() => {nav('/')}),
            apiRequest('contact/list').then(data => {setContacts(data)}).catch(() => {nav('/')})
        ]).then(() => {isLoading(false)})
    }

    useEffect(() => { load().then() }, []);

    if(loading) return <LoadingScreen />
    return <_ContactContext.Provider value={{contacts, customers, load}}>
        {children}
    </_ContactContext.Provider>
}