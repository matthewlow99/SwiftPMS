import React from "react"
import {useNavigate} from "react-router-dom";
import ListEntryText from "../_entryComponents/ListEntryText";
import {faBuilding, faEnvelope, faPhone} from "@fortawesome/free-solid-svg-icons";

function CustomerListEntry({customer}){
    const nav = useNavigate()
    function navigate(){
        nav(`/customer/${customer._id}`)
    }

    return (
        <div className={'entryContainer'} onClick={navigate}>
            <ListEntryText text={customer.name} color={customer.color}/>
            <ListEntryText text={'#1001'} icon={faBuilding}/>
            <ListEntryText text={customer.status} color={'cyan'}/>
            <ListEntryText text={customer.email} icon={faEnvelope}/>
            <ListEntryText text={customer.phone} icon={faPhone}/>
        </div>
    )
}

export default CustomerListEntry