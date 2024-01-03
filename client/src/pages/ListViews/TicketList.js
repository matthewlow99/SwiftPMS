import React from "react"
import CreateTicketForm from "../../components/popup/Tickets/CreateTicketForm";
import TableList from "../../components/tables/TableList";

function TicketList({useParentContext}){
    const {tickets, createTicketForm} = useParentContext()
    const ticket_field_map = {
        "COMPANY NAME": "company",
        "TICKET SUBJECT": "ticketSubject",
        "PROJECT": "projectName",
        "START DATE": "createdDate"
    }

    return <>
            <TableList list={tickets} keyMap={ticket_field_map} createForm={createTicketForm} navPrefix={'ticket'} />
    </>
}

export default TicketList