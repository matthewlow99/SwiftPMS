import React from "react"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEnvelope, faPhone, faUser, faUserCircle, faWrench} from "@fortawesome/free-solid-svg-icons";
import {useNavigate, useParams} from "react-router-dom";

import ListEntryText from "../_entryComponents/ListEntryText";

function ContactPageGridEntry({contact}){

    const nav = useNavigate()

    return (
        <div className={'entryContainer'} onClick={()=>{nav(`/contact/${contact._id}`)}}>
            <ListEntryText text={contact?.customer[0]?.name} icon={null} color={contact?.customer[0]?.color}/>
            <ListEntryText text={contact?.name} icon={faUser}/>
            <ListEntryText text={contact?.email} icon={faEnvelope}/>
            <ListEntryText text={contact?.phone} icon={faPhone}/>
        </div>
    )
}

export default ContactPageGridEntry