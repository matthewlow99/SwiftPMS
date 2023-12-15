import {createContext, useContext, useEffect, useState} from "react";
import Item from "../../pages/item/Item";
import {useNavigate, useParams} from "react-router-dom";
import ContactDataClass from "../../classes/ContactDataClass";
import {cloneObject, waitSeconds} from "../../helpers/misc/miscHelpers";
import LoadingScreen from "../../components/Loading/LoadingScreen";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEnvelope, faPhone} from "@fortawesome/free-solid-svg-icons";
import CustomerDisplayTile from "../../components/item/detail/CustomerDisplayTile";

const _ContactDataContext = createContext()

export function useContactDataContext(){
    return useContext(_ContactDataContext)
}
export function ContactDataContext(){

    const [loading, isLoading] = useState(true)
    const {contactID} = useParams();
    const [contact, setContact] = useState(new ContactDataClass(contactID))

    const nav = useNavigate();

    useEffect(() => {load().then()}, []);

    async function load(){
        await Promise.all([
            contact.loadObject().then(update),
            waitSeconds()
        ]).then(() => {isLoading(false)})
    }
    function update(){
        setContact(cloneObject(contact))
    }
    async function postNote(note){
        await contact.postNote(note).then(load)
    }
    async function linkAssets(assetArray){
        await contact.linkAssets(assetArray).then(load)
    }
    function renderDetailView(){
        return (
            <div>
                <CustomerDisplayTile customer={contact.customer}/>
                <span className={'flexRowAlignCenter'} style={{width: 'fit-content'}}>
                    <FontAwesomeIcon icon={faEnvelope} color={'black'}/>
                    <p style={{fontSize: 22, margin: 0, color: 'black'}}>{contact.email}</p>
                </span>
                <span className={'flexRowAlignCenter'} style={{width: 'fit-content'}}>
                    <FontAwesomeIcon icon={faPhone} color={'black'}/>
                    <p style={{fontSize: 22, margin: 0, color: 'black'}}>{contact.phone}</p>
                </span>
            </div>
        )
    }

    if(loading) return <LoadingScreen />
    return <_ContactDataContext.Provider value={{renderDetailView, item: contact, postNote, update, load, linkAssets}}><Item useContext={useContactDataContext}/></_ContactDataContext.Provider>
}