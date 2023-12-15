import React from "react"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUser, faUserAlt} from "@fortawesome/free-solid-svg-icons";
import {useNavigate} from "react-router-dom";


function ContactLinkEntry({contact}){

    const nav = useNavigate()

    return (
        <div className={'contactLinkContainer'} onClick={()=>{nav(`/contact/${contact._id}`)}}>
            <FontAwesomeIcon icon={faUserAlt} color={'black'} size={'2xl'}/>
            <div className={'contactLinkTextContainer'}>
                <h2>{contact.name}</h2>
                <p>{contact.email}</p>
                <p>{contact.phone}</p>
            </div>
        </div>
    )
}

export default ContactLinkEntry