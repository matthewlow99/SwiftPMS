import React from "react"
import AssetLinkEntry from "../asset/AssetLinkEntry";
import ContactLinkEntry from "../contact/ContactLinkEntry";

function AssetContactList(){
    return (<>
        <div className={'ticketLinkContainer'}>
            <h2 style={{textAlign: 'center'}}>Devices</h2>
            <AssetLinkEntry />
            <AssetLinkEntry />
            <AssetLinkEntry />
            <AssetLinkEntry />
            <AssetLinkEntry />

            <h2 style={{textAlign: 'center'}}>Contacts</h2>
            <ContactLinkEntry />
            <ContactLinkEntry />
            <ContactLinkEntry />
            <ContactLinkEntry />
            <ContactLinkEntry />
        </div>
    </>)
}

export default AssetContactList