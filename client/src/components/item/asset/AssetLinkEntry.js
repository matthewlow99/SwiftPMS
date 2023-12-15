import React from "react"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faDesktop, faUserAlt} from "@fortawesome/free-solid-svg-icons";
import {useNavigate} from "react-router-dom";

function AssetLinkEntry({asset}){
    const nav = useNavigate();
    return (
        <div className={'contactLinkContainer'} onClick={()=>{nav(`/asset/${asset._id}`)}}>
            <FontAwesomeIcon icon={faDesktop} color={'black'} size={'2xl'}/>
            <div className={'contactLinkTextContainer'}>
                <h2>{asset.assetName}</h2>
                <p>{asset.assetTagID}</p>
                <p>{asset.assetType}</p>
            </div>
        </div>
    )
}

export default AssetLinkEntry