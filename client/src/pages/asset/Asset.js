import React from "react"
import AssetLinkEntry from "../../components/item/asset/AssetLinkEntry";
import TicketListEntry from "../../components/TicketList/TicketListEntry";
import NoteTextInput from "../../components/notes/NoteTextInput";
import NoteEntry from "../../components/notes/NoteEntry";
import ContactLinkEntry from "../../components/item/contact/ContactLinkEntry";

function Asset(){
    return (

            <div style={{display: 'flex', flex: 1}}>
                <div className={'ticketLinkContainer'}>
                    <h2 style={{textAlign: 'center'}}>Devices</h2>
                    <ContactLinkEntry />
                    <ContactLinkEntry />
                    <ContactLinkEntry />
                    <ContactLinkEntry />
                    <ContactLinkEntry />
                </div>
                <div className={'ticketPageContainer'}>
                    <h1>Kyocera Printer</h1>
                    <div>
                        <h3>Currently Open Tickets:</h3>
                        <TicketListEntry />
                        <TicketListEntry />
                        <TicketListEntry />
                    </div>
                    <div className={'notePageContainer'}>
                        <h3>Notes:</h3>
                        <NoteTextInput />
                        <NoteEntry />
                        <NoteEntry />
                        <NoteEntry />
                        <NoteEntry />
                        <NoteEntry />
                        <NoteEntry />
                        <NoteEntry />
                        <NoteEntry />
                        <NoteEntry />
                        <NoteEntry />
                        <NoteEntry />
                        <NoteEntry />
                    </div>
                </div>
            </div>

    )
}

export default Asset