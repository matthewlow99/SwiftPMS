import {createContext, useContext, useEffect, useState} from "react";
import Item from "../../pages/item/Item";
import {useNavigate, useParams} from "react-router-dom";
import ContactDataClass from "../../classes/ContactDataClass";
import {
    cloneObject,
    parseListAppendCustomer,
    parseListAppendProject,
    waitSeconds
} from "../../helpers/misc/miscHelpers";
import LoadingScreen from "../../components/Loading/LoadingScreen";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEnvelope, faPhone} from "@fortawesome/free-solid-svg-icons";
import CustomerDisplayTile from "../../components/item/detail/CustomerDisplayTile";
import {apiRequest} from "../../helpers/api/apiFunctionHelpers";
import LinkCustomerAssets from "../../components/popup/Assets/LinkCustomerAssets";

const _ContactDataContext = createContext()

export function useContactDataContext(){
    return useContext(_ContactDataContext)
}
export function ContactDataContext(){

    const [loading, isLoading] = useState(true)

    const tabHeaders = ['notes', 'tickets', 'assets']
    const nav = useNavigate();
    const {contactID} = useParams();

    const [customer, setCustomer] = useState({})
    const [contact, setContact] = useState({})
    const [notes, setNotes] = useState([])
    const [tickets, setTickets] = useState([])
    const [assets, setAssets] = useState([])
    const [allAssets, setAllAssets] = useState([])

    const fetchContact = async () => await apiRequest('contact/fetch/contacts', {id: contactID}).then(data => setContact(data[0]))
    const fetchNotes = async () => await apiRequest('contact/fetch/notes', {id: contactID}).then(data => setNotes(data))
    const fetchTickets = async () => await apiRequest('contact/fetch/tickets', {id: contactID}).then(data => parseListAppendCustomer(data)).then(data => parseListAppendProject(data)).then(data => setTickets(data))
    const fetchAssets = async () => await apiRequest('contact/fetch/assets', {id: contactID}).then(data => parseListAppendCustomer(data)).then(data => setAssets(data))
    const fetchAllAssets = async (customerID) => await apiRequest('customer/fetch/assets', {id: customerID}).then(data => setAllAssets(data))

    const linkAssetSubmit = async (assetArray) => await apiRequest('contact/link_assets', {contactID, assetArray}).then(fetchAssets)
    const linkAssetForm = (dismiss) => <LinkCustomerAssets assets={allAssets} onSubmit={linkAssetSubmit} dismiss={dismiss}/>

    const postNote = async (note) => await apiRequest('contact/add_note', {contactID, note}).then(fetchNotes)

    async function load(){
        await Promise.all([
            fetchContact(),
            fetchNotes(),
            fetchTickets(),
            fetchAssets()
        ])
        isLoading(false)
    }

    useEffect(() => load, []);

    useEffect(() => {
        setCustomer(contact.customer)
        fetchAllAssets(contact.customer?._id).then()
    }, [contact]);

    if(loading) return <LoadingScreen />
    return  <_ContactDataContext.Provider value={{notes, tickets, assets, linkAssetForm, postNote}}>
                <div className={'w-full bg-[#0c0c0c] flex flex-row items-center gap-3'}>
                    <div className={`h-3 w-3 rounded-xl`} style={{backgroundColor: customer?.color}}/>
                    <h1 className={'text-white font-bold text-lg hover:underline hover:cursor-pointer'} onClick={()=>{nav(`/customer/${customer._id}`)}}>{customer.name}</h1>
                </div>
                <Item tabIndexes={tabHeaders} useParentContext={useContactDataContext} id={contactID} title={contact.name}/>
            </_ContactDataContext.Provider>
}