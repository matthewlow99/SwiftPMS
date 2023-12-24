import React, {createContext, useContext, useEffect, useState} from "react"
import {apiRequest} from "../../helpers/api/apiFunctionHelpers";
import LoadingScreen from "../../components/Loading/LoadingScreen";
import {useNavigate} from "react-router-dom";
import TableList from "../../components/tables/TableList";
import CreateTicketForm from "../../components/popup/Tickets/CreateTicketForm";
import {
    parseListAppendCustomer,
    parseListAppendProject,
    parseListCustomer,
    parseListForTable
} from "../../helpers/misc/miscHelpers";

const TicketListDataContext = createContext();

export function useTicketListContext(){
    return useContext(TicketListDataContext)
}

export function TicketListContext({children}){

    const [loading, isLoading] = useState(true)

    const createTicket = (dismiss) => <CreateTicketForm dismiss={dismiss}/>

    const [tickets, setTickets] = useState([]);
    const [contacts, setContacts] = useState([]);
    const [customers, setCustomers] = useState([])
    const [projects, setProjects] = useState([])

    const ticket_field_map = {
        "COMPANY NAME": "company",
        "TICKET SUBJECT": "ticketSubject",
        "PROJECT": "projectName",
        "START DATE": "createdDate"
    }

    const nav = useNavigate();

    async function load(){
        isLoading(true)
        await Promise.all([
            apiRequest('ticket/list').then(data => parseListAppendCustomer(data)).then(data=>parseListAppendProject(data)).then(data => {setTickets(data)}).catch(() => {nav('/')}),
            apiRequest('customer/list').then(data => {setCustomers(data)}).catch(() => {nav('/')}),
            apiRequest('project/list').then(data => {setProjects(data)}).catch(() => {nav('/')})
        ]).then(() => {isLoading(false)})

    }

    useEffect(() => { load().then() }, [])

    if(loading) return <LoadingScreen />
    return <TicketListDataContext.Provider value={{tickets, contacts, customers, projects, load}}>
        <TableList list={tickets} keyMap={ticket_field_map} createForm={createTicket} navPrefix={'ticket'}/>
    </TicketListDataContext.Provider>
}

export default TicketListContext