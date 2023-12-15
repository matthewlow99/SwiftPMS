import React from "react"
import ListEntryText from "../_entryComponents/ListEntryText";
import {faEnvelope, faFolder, faPhone} from "@fortawesome/free-solid-svg-icons";

function TicketProjectLink({status, subject, isOpen, projectName, navFunction=()=>{alert('Nav not provided')}}){
    return (<>
        <div className={'entryLinkContainer'} onClick={navFunction} style={{maxWidth: '100%'}}>
            <div className={'flexRowAlignCenter'}>
                <ListEntryText text={isOpen ? 'Open' : 'Closed'} color={isOpen ? 'limegreen' : 'red'}/>
                <ListEntryText text={status} color={'cyan'}/>
            </div>
            {subject && <ListEntryText text={subject}/>}
            {projectName && <ListEntryText text={projectName} icon={faFolder}/>}
        </div>
    </>)
}

export default TicketProjectLink