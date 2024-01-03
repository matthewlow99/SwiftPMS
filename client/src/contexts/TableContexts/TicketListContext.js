import React, {createContext, useContext, useEffect, useState} from "react"
import {apiRequest} from "../../helpers/api/apiFunctionHelpers";
import LoadingScreen from "../../components/Loading/LoadingScreen";
import {useNavigate} from "react-router-dom";
import TableList from "../../components/tables/TableList";
import CreateTicketForm from "../../components/popup/Tickets/CreateTicketForm";
import {
    filterArrayByKey,
    parseListAppendCustomer,
    parseListAppendProject,
    parseListCustomer,
    parseListForTable
} from "../../helpers/misc/miscHelpers";
import {useGlobalDataContext} from "../_SessionContexts/GlobalDataContext";

const TicketListDataContext = createContext();

export function useTicketListContext(){
    return useContext(TicketListDataContext)
}

export function TicketListContext({useParentContext=()=>{alert('no context provided')}}){

    // const {customers, projects, tickets} = useParentContext()
    const createTicket = (dismiss) => <CreateTicketForm dismiss={dismiss} useParentContext={useParentContext}/>

    const ticket_field_map = {
        "COMPANY NAME": "company",
        "TICKET SUBJECT": "ticketSubject",
        "PROJECT": "projectName",
        "START DATE": "createdDate"
    }
    return <p>Done</p>
    // return <TableList list={tickets} keyMap={ticket_field_map} createForm={createTicket} navPrefix={'ticket'}/>
}

export default TicketListContext