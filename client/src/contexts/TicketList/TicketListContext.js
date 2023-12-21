import React, {createContext, useContext, useEffect, useState} from "react"
import {apiRequest} from "../../helpers/api/apiFunctionHelpers";
import LoadingScreen from "../../components/Loading/LoadingScreen";
import {useNavigate} from "react-router-dom";

const TicketListDataContext = createContext();

export function useTicketListContext(){
    return useContext(TicketListDataContext)
}

export function TicketListContext({children}){

    const [loading, isLoading] = useState(true)

    const [tickets, setTickets] = useState([]);
    const [contacts, setContacts] = useState([]);
    const [customers, setCustomers] = useState([])
    const [projects, setProjects] = useState([])

    const nav = useNavigate();

    async function load(){
        isLoading(true)
        await Promise.all([
            apiRequest('ticket/list').then(data => {setTickets(data)}).catch(() => {nav('/')}),
            apiRequest('customer/list').then(data => {setCustomers(data)}).catch(() => {nav('/')}),
            apiRequest('project/list').then(data => {setProjects(data)}).catch(() => {nav('/')})
        ]).then(() => {isLoading(false)})
    }

    useEffect(() => { load().then() }, [])

    if(loading) return <LoadingScreen />
    return <TicketListDataContext.Provider value={{tickets, contacts, customers, projects, load}}>
        {children}
    </TicketListDataContext.Provider>
}

export default TicketListContext