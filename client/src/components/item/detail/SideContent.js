import React, {useState} from "react"
import ContactLinkEntry from "../contact/ContactLinkEntry";
import FullscreenModal from "../../popup/FullscreenModal";
import CreateContactForm from "../../popup/Contacts/CreateContactForm";
import CreateContactInCustomer from "../../popup/Contacts/CreateContactInCustomer";
import AssetLinkEntry from "../asset/AssetLinkEntry";
import ListCustomerAssets from "../../popup/Assets/ListCustomerAssets";
import LinkCustomerContacts from "../../popup/Contacts/LinkCustomerContacts";

function SideContent({useContext}){


    const {item, linkContacts, linkAssets} = useContext()



    const [linkContact, setLinkContact] = useState(false)
    const [linkAsset, setLinkAsset] = useState(false)
    const contactGroup = () => (<>
        <div className={'flexRowAlignCenter'}>
            <h1 style={{textAlign: 'center'}}>Contacts</h1>
        </div>
        {
            item.contacts.map((e, ind) => {
                return <ContactLinkEntry contact={e} key={ind}/>
            })
        }
    </>)

    const assetGroup = () => (
        <>
            <div className={'flexRowAlignCenter'}>
                <h1 style={{textAlign: 'center'}}>Assets</h1>
            </div>
            {
                item.assets.map((e, ind) => {
                    return <AssetLinkEntry asset={e} key={ind}/>
                })
            }
        </>
    )


    return (
        <>
            <div className={'ticketLinkContainer'}>
                {item.contacts && contactGroup()}
                {item.allContacts  && <p onClick={()=>{setLinkContact(true)}}>Link Existing Contact</p>}
                {item.assets && assetGroup()}
                {item.allAssets && <p onClick={()=>{setLinkAsset(true)}}>Link Existing Asset</p>}
            </div>
            <FullscreenModal visible={linkContact} formElement={<LinkCustomerContacts onSubmit={linkContacts} contacts={item.allContacts} dismiss={()=>{setLinkContact(false)}}/>}/>
            <FullscreenModal visible={linkAsset} formElement={<ListCustomerAssets onSubmit={linkAssets} assets={item.allAssets} dismiss={()=>{setLinkAsset(false)}}/>}/>
        </>

    )
}

export default SideContent