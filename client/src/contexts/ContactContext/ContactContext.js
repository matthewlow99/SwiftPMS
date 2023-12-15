import {createContext, useContext, useEffect, useState} from "react";
import {apiRequest} from "../../helpers/api/apiFunctionHelpers";

const _ContactContext = createContext();

export function useContactListContext(){
    return useContext(_ContactContext)
}
export function ContactContext({children}){

    const [loading, isLoading] = useState(true)
    const [contacts, setContacts] = useState([])
    const [customers, setCustomers] = useState([])

    async function load(){
        isLoading(true)
        await Promise.all([
            apiRequest('customer/list').then(data => {setCustomers(data)}),
            apiRequest('contact/list').then(data => {setContacts(data)})
        ]).then(() => {isLoading(false)})
    }

    useEffect(() => { load().then() }, []);

    if(loading) return <h1>Loading...</h1>
    return <_ContactContext.Provider value={{contacts, customers, load}}>
        {children}
    </_ContactContext.Provider>
}