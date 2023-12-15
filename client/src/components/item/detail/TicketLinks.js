import React from "react"
import TicketProjectLink from "./TicketProjectLink";
import {useNavigate} from "react-router-dom";

function TicketLinks({tickets}){
    const nav = useNavigate()
    return (
        <div style={{flex: 1}}>
            <h3>Currently Open Tickets:</h3>
            {
                tickets?.map((e, ind) => {
                    return <TicketProjectLink navFunction={()=>{nav(`/ticket/${e._id}`)}} status={e.status} subject={e.ticketSubject} isOpen={e.isOpen} projectName={e?.project?.projectName}/>
                })
            }
        </div>
    )
}

export default TicketLinks