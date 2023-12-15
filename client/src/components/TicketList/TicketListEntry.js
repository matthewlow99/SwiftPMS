import React from "react"
import '../../css/TicketList.css'
import {useNavigate} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEnvelope, faFolder, faPhone, faTicket} from "@fortawesome/free-solid-svg-icons";
import ListEntryText from "../item/_entryComponents/ListEntryText";

function TicketListEntry({ticket}){
    console.log(ticket)
    const nav = useNavigate()
    function navigate(){
        nav(`/ticket/${ticket._id}`)
    }

    return (
        <div className={'entryContainer'} onClick={navigate} >
            <ListEntryText text={ticket?.customer[0]?.name || ""} color={ticket?.customer[0]?.color || ""}/>
            <div className={'flexRowAlignCenter'} style={{flex: 1}}>
                <ListEntryText text={ticket?.isOpen ? 'Open' : 'Closed'} color={ticket?.isOpen ? 'limegreen' : 'red'}/>
                <ListEntryText text={ticket?.status} color={'cyan'}/>
            </div>
            <ListEntryText text={ticket?.ticketSubject}/>
            <ListEntryText text={ticket?.project[0]?.projectName || ""} icon={faFolder} flexOverride={2}/>
            <ListEntryText text={ticket?.customer[0]?.email || ""} icon={faEnvelope}/>
            <ListEntryText text={ticket?.customer[0]?.phone || ""} icon={faPhone}/>
        </div>
    )

}


export default TicketListEntry