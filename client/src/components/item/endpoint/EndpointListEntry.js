import React from "react"
import ListEntryText from "../_entryComponents/ListEntryText";
import {faBuilding} from "@fortawesome/free-solid-svg-icons";

function EndpointListEntry(){
    return (
        <div className={'entryContainer'} onClick={()=>{nav(`/contact/${contact._id}`)}}>
            <ListEntryText text={'Swift PMS'} icon={faBuilding}/>
            <ListEntryText text={'Endpoint: /'}/>
        </div>
    )
}

export default EndpointListEntry