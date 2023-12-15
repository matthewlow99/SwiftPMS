import React from "react"
import NoteView from "../../components/item/views/NoteView";
import SideContent from "../../components/item/detail/SideContent";
import TicketLinks from "../../components/item/detail/TicketLinks";
import ProjectLinks from "../../components/item/detail/ProjectLinks";

function Item({useContext}){
    const {item, postNote, renderDetailView} = useContext()

    return (
        <div style={{display: 'flex', flex: 1}}>
            {(item.contacts || item.assets) && <SideContent useContext={useContext}/>}
            <div className={'ticketPageContainer'}>
                <span className={'flexRowAlignCenter'} style={{justifyContent: 'flex-start'}}>
                    {item?.color && <div style={{width: 20, height: 20, backgroundColor: item?.color || 'transparent', borderRadius: 20}}/>}
                    <h1 style={{color: '#CCCCCC', fontSize: 35}}>{item.title}</h1>
                    <h4>ID &middot; {item.objectID}</h4>
                </span>
                {renderDetailView()}
                <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', width: '100%', gap: 20}}>
                    {item.tickets && <TicketLinks tickets={item.tickets}/>}
                    {item.projects && <ProjectLinks projects={item.projects}/>}
                </div>
                <NoteView notes={item.notes} postNoteFunction={postNote}/>
            </div>
        </div>
    )
}

export default Item