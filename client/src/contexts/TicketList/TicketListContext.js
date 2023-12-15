import React, {createContext, useContext, useEffect, useState} from "react"
import {apiRequest} from "../../helpers/api/apiFunctionHelpers";

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

    async function load(){
        isLoading(true)
        await Promise.all([
            apiRequest('ticket/list').then(data => {setTickets(data)}),
            apiRequest('customer/list').then(data => {setCustomers(data)}),
            apiRequest('project/list').then(data => {setProjects(data)})
        ]).then(() => {isLoading(false)})
    }

    useEffect(() => { load().then() }, [])

    if(loading) return <h2>Loading</h2>
    return <TicketListDataContext.Provider value={{tickets, contacts, customers, projects, load}}>
        {children}
    </TicketListDataContext.Provider>
}

export default TicketListContext