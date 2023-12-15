import React from "react"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBuilding, faDesktop, faEnvelope, faPhone, faUserAlt, faWrench} from "@fortawesome/free-solid-svg-icons";
import {useNavigate} from "react-router-dom";
import ListEntryText from "../_entryComponents/ListEntryText";

function AssetPageListEntry({asset}){

    const nav = useNavigate()

    return (
        <div className={'entryContainer'} onClick={()=>{nav(`/asset/${asset._id}`)}}>
            <ListEntryText text={asset?.customer[0]?.name} color={asset?.customer[0]?.color}/>
            <ListEntryText text={asset?.assetType} icon={faDesktop}/>
            <ListEntryText text={`${asset?.assetTagID} - ${asset?.assetName}`} icon={faDesktop}/>
            <ListEntryText text={asset?.customer[0]?.email} icon={faEnvelope}/>
            <ListEntryText text={asset?.customer[0]?.phone} icon={faPhone}/>
        </div>
    )
}

export default AssetPageListEntry