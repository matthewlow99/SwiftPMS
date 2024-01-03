import React from "react"
import {useParams} from "react-router-dom";
import '../../css/Ticket.css'
import NoteEntry from "../../components/notes/NoteEntry";
import NoteTextInput from "../../components/notes/NoteTextInput";
import ContactLinkEntry from "../../components/item/contact/ContactLinkEntry";
import AssetLinkEntry from "../../components/item/asset/AssetLinkEntry";
import {useCustomerDataContext} from "../../contexts/ParentContexts/CustomerDataContext";
import SideContent from "../../components/item/detail/SideContent";
import TicketLinks from "../../components/item/detail/TicketLinks";
import ProjectLinks from "../../components/item/detail/ProjectLinks";
import NoteView from "../../components/item/views/NoteView";
import {useTicketDataContext} from "../../contexts/ParentContexts/TicketDataContext";

function Ticket(){
    const {ticketID} = useParams()

    // const {customerID} = useParams()
    // const {customer, contacts, assets, tickets, projects, notes, postNote} = {};

    const context = useTicketDataContext()

    return (
        <div style={{display: 'flex', flex: 1}}>

            <SideContent contacts={[]} assets={[]} context={context}/>

            {/*<div className={'ticketPageContainer'}>*/}

            {/*    <span className={'flexRowAlignCenter'} style={{justifyContent: 'flex-start'}}>*/}
            {/*        <div style={{width: 20, height: 20, backgroundColor: customer?.color || 'transparent', borderRadius: 20}}/>*/}
            {/*        <h1 style={{color: 'white'}}>{customer.name}</h1>*/}
            {/*        <h4>ID &middot; '00000'</h4>*/}
            {/*    </span>*/}


            {/*    <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', width: '100%', gap: 20}}>*/}
            {/*        <TicketLinks tickets={tickets}/>*/}
            {/*        <ProjectLinks projects={projects}/>*/}
            {/*    </div>*/}

            {/*    <NoteView notes={notes} postNoteFunction={postNote}/>*/}
            {/*</div>*/}
        </div>
    )
}

export default Ticket