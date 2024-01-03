import {createContext, useContext, useEffect, useState} from "react";
import Item from "../../pages/item/Item";
import AssetDetailClass from "../../classes/AssetDetailClass";
import {useNavigate, useParams} from "react-router-dom";
import {
    cloneObject,
    parseListAppendCustomer,
    parseListAppendProject,
    waitSeconds
} from "../../helpers/misc/miscHelpers";
import LoadingScreen from "../../components/Loading/LoadingScreen";
import CustomerDisplayTile from "../../components/item/detail/CustomerDisplayTile";
import {apiRequest} from "../../helpers/api/apiFunctionHelpers";
import LinkCustomerContacts from "../../components/popup/Contacts/LinkCustomerContacts";

const _AssetDataContext = createContext()

export function useAssetDataContext(){
    return useContext(_AssetDataContext)
}

export function AssetDataContext(){

    const [loading, isLoading] = useState(true)
    const {assetID} = useParams();
    const nav = useNavigate();

    const tabs = ['notes', 'tickets', 'contacts']
    const [asset, setAsset] = useState({})
    const [customer, setCustomer] = useState({})
    const [contacts, setContacts] = useState([])
    const [notes, setNotes] = useState([])
    const [tickets, setTickets] = useState([])
    const [allContacts, setAllContacts] = useState([])

    const fetchAsset = async () => await apiRequest('asset/fetch/assets', {id: assetID}).then(data => setAsset(data[0]))
    const fetchNotes = async () => await apiRequest('asset/fetch/notes', {id: assetID}).then(data => setNotes(data))
    const fetchTickets = async () => await apiRequest('asset/fetch/tickets', {id: assetID}).then(data => parseListAppendCustomer(data)).then(data => parseListAppendProject(data)).then(data => setTickets(data))
    const fetchContacts = async () => await apiRequest('asset/fetch/contacts', {id: assetID}).then(data => parseListAppendCustomer(data)).then(data => setContacts(data))
    const fetchAllContacts = async (customerID) => await apiRequest('customer/fetch/contacts', {id: customerID}).then(data => setAllContacts(data));

    const linkContactForm = (dismiss) => <LinkCustomerContacts contacts={allContacts} dismiss={dismiss} onSubmit={linkContactsSubmit}/>
    const linkContactsSubmit = async (contactArray) => await apiRequest('asset/link_contacts', {assetID, contactArray}).then(fetchContacts)

    const postNote = async (note) => await apiRequest('asset/add_note', {note, assetID}).then(fetchNotes)

    useEffect(() => {
        setCustomer(asset?.customer)
        fetchAllContacts(asset?.customerID)
    }, [asset])
    useEffect(() => { load().then(() => isLoading(false)) }, []);

    async function load(){
        await Promise.all([
            fetchAsset(),
            fetchNotes(),
            fetchTickets(),
            fetchContacts()
        ])
    }

    if(loading) return <LoadingScreen />
    return <_AssetDataContext.Provider value={{notes, tickets, contacts, linkContactForm, postNote}}>
        <div className={'w-full bg-[#0c0c0c] flex flex-row items-center gap-3'}>
            <div className={`h-3 w-3 rounded-xl`} style={{backgroundColor: customer?.color}}/>
            <h1 className={'text-white font-bold text-lg hover:underline hover:cursor-pointer'} onClick={()=>{nav(`/customer/${customer?._id}`)}}>{customer?.name}</h1>
        </div>
        <Item tabIndexes={tabs} id={asset._id} title={`${asset.assetName} - ${asset.assetTagID}`} color={customer?.color} useParentContext={useAssetDataContext}/>
    </_AssetDataContext.Provider>
}