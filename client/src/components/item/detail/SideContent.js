import React, {useState} from "react"
import ContactLinkEntry from "../contact/ContactLinkEntry";
import FullscreenModal from "../../popup/FullscreenModal";
import CreateContactForm from "../../popup/Contacts/CreateContactForm";
import CreateContactInCustomer from "../../popup/Contacts/CreateContactInCustomer";
import AssetLinkEntry from "../asset/AssetLinkEntry";
import ListCustomerAssets from "../../popup/Assets/ListCustomerAssets";
import LinkCustomerContacts from "../../popup/Contacts/LinkCustomerContacts";
import asset from "../../../pages/asset/Asset";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faDesktop, faUsers} from "@fortawesome/free-solid-svg-icons";
import {faLaptop} from "@fortawesome/free-solid-svg-icons/faLaptop";

function SideContent({useContext}){


    const {item, linkContacts, linkAssets} = useContext()

    const [selected, setSelected] = useState('contact')

    const [linkContact, setLinkContact] = useState(false)
    const [linkAsset, setLinkAsset] = useState(false)
    const contactGroup = () => (<>
        <div className={'flex flex-row justify-evenly w-full py-5'}>
            <div className={'w-full text-center hover:cursor-pointer'}><FontAwesomeIcon icon={faUsers} color={'white'} size={'xl'}/> </div>
            <div className={'w-full text-center hover:cursor-pointer'} onClick={()=>{setSelected('asset')}}><FontAwesomeIcon icon={faDesktop} color={'white'} size={'xl'}/></div>
        </div>
        {animatedSelectedBar()}
        {
            item.contacts.map((e, ind) => {
                return <ContactLinkEntry contact={e} key={ind}/>
            })
        }
        <h1 className={'list-button my-10'} onClick={()=>{setLinkContact(true)}}>Create New Contact</h1>
    </>)

    const assetGroup = () => (
        <>
            <div className={'flex flex-row justify-evenly w-full py-5'}>
                <div className={'w-full text-center hover:cursor-pointer'} onClick={()=>{setSelected('contact')}}><FontAwesomeIcon icon={faUsers} color={'white'} size={'xl'}/></div>
                <div className={'w-full text-center hover:cursor-pointer'}><FontAwesomeIcon icon={faDesktop} color={'white'} size={'xl'}/></div>
            </div>
            {animatedSelectedBar()}
            {
                item.assets.map((e, ind) => {
                    return <AssetLinkEntry asset={e} key={ind}/>
                })
            }
            <h1 className={'list-button my-10'} onClick={()=>{setLinkContact(true)}}>Create New Asset</h1>
        </>
    )

    const animatedSelectedBar = () => (
        <>
            <div className={'w-full h-[2px] bg-[rgba(255,255,255,.3)] relative transition-all duration-1000'}>
                <div className={`h-full bg-white ${selected === 'contact' ? 'mr-[50%]' : 'ml-[50%]'} transition-all`}/>
            </div>
        </>
    )


    return (
        <>
            {/*<div className={'ticketLinkContainer'}>*/}
            {/*    {item.contacts && contactGroup()}*/}
            {/*    {item.allContacts  && <p onClick={()=>{setLinkContact(true)}}>Link Existing Contact</p>}*/}
            {/*    {item.assets && assetGroup()}*/}
            {/*    {item.allAssets && <p onClick={()=>{setLinkAsset(true)}}>Link Existing Asset</p>}*/}
            {/*</div>*/}

            {/*<button onClick={()=>{setSelected('contact')}}>Contact</button>*/}
            {/*<button onClick={()=>{setSelected('asset')}}>Asset</button>*/}
            <div className={'w-full h-screen flex flex-col items-center border-r-2 border-black bg-[#0a0619]'}>
                {selected === 'contact' ? contactGroup() : assetGroup()}
            </div>
            {/*<FullscreenModal visible={linkContact} formElement={<LinkCustomerContacts onSubmit={linkContacts} contacts={item.allContacts || []} dismiss={()=>{setLinkContact(false)}}/>}/>*/}
            {/*<FullscreenModal visible={linkAsset} formElement={<ListCustomerAssets onSubmit={linkAssets} assets={item.allAssets} dismiss={()=>{setLinkAsset(false)}}/>}/>*/}
            <FullscreenModal visible={linkContact} formElement={<CreateContactForm dismiss={()=>{setLinkContact(false)}}/>}/>
        </>

    )
}

export default SideContent