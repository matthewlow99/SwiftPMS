import React, {useEffect, useState} from "react"
import TicketListEntry from "../../components/TicketList/TicketListEntry";
import '../../css/TicketList.css'
import CreateTicketForm from "../../components/popup/Tickets/CreateTicketForm";
import {apiRequest} from "../../helpers/api/apiFunctionHelpers";
import {useTicketListContext} from "../../contexts/TicketList/TicketListContext";
import FullscreenModal from "../../components/popup/FullscreenModal";

function TicketList(){
    const [showCreate, setShowCreate] = useState(false)

    const {tickets} = useTicketListContext()

    return (
        <>
            <div className={'pageContainer'}>
                <div className={'flexRowAlignCenter'} style={{justifyContent: 'space-between', width: '100%', marginTop: 20, marginBottom: 20}}>
                    <p className={'listPageButton'} onClick={() => {setShowCreate(true)}}>+ Create New Ticket</p>
                    <p>View Closed Tickets</p>
                </div>
                {
                    tickets?.map((e, index) => {
                        return <TicketListEntry ticket={e} key={index}/>
                    })
                }
            </div>
            <FullscreenModal visible={showCreate} formElement={<CreateTicketForm dismiss={() => {setShowCreate(false)}}/>}/>
        </>
    )
}

export default TicketList