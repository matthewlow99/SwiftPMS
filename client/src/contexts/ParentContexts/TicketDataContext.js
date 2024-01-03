import {createContext, useContext, useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {apiRequest} from "../../helpers/api/apiFunctionHelpers";
import Item from "../../pages/item/Item";
import TicketDataClass from "../../classes/TicketDataClass";
import LoadingScreen from "../../components/Loading/LoadingScreen";
import {
    cloneObject,
    parseListAppendCustomer,
    parseListAppendProject,
    waitSeconds
} from "../../helpers/misc/miscHelpers";
import CustomerDisplayTile from "../../components/item/detail/CustomerDisplayTile";
import LinkCustomerContacts from "../../components/popup/Contacts/LinkCustomerContacts";
import LinkCustomerAssets from "../../components/popup/Assets/LinkCustomerAssets";


const TicketDataDataContext = createContext();
export function useTicketDataContext(){
    return useContext(TicketDataDataContext)
}
export function TicketDataContext(){
    const [loading, isLoading] = useState(true)
    const {ticketID} = useParams();
    const tabIndex = ['notes', 'projects', 'contacts', 'assets']
    const nav = useNavigate();

    let customerID = "-1";
    // const [customerID, setCustomerID] = useState("-1")
    const [name, setName] = useState("");
    const [color, setColor] = useState("")
    const [tickets, setTickets] = useState([])
    const [notes, setNotes] = useState([])
    const [customer, setCustomer] = useState([])
    const [projects, setProjects] = useState([])
    const [contacts, setContacts] = useState([])
    const [allContacts, setAllContacts] = useState([])
    const [assets, setAssets] = useState([])
    const [allAssets, setAllAssets] = useState([])

    // let customerID = "-1";
    // let name = "Loading...";
    // let color = "#FFFFFF";
    // let tickets = [];
    // let notes = [];
    // let customer = [];
    // let projects = [];
    // let contacts = [];
    // let assets = [];
    // let allContacts = [];
    // let allAssets = [];




    const fetchTickets = async () => { await apiRequest(`ticket/fetch/tickets`, {id: ticketID}).then(data => parseListAppendCustomer(data)).then(data=>parseListAppendProject(data)).then(data => {
        setTickets(data)
        customerID = data[0].customerID;
        setName(data[0].ticketSubject);
    }) }
    const fetchCustomers = async () => {await apiRequest('customer/fetch/customers', {id: customerID}).then(data => {
        setCustomer(data[0]);
        setColor(data[0].color);
    })}
    const fetchProjects = async () => await apiRequest(`ticket/fetch/projects`, {id: ticketID}).then(data => parseListAppendCustomer(data)).then(data => setProjects(data)).catch(() => {})
    const fetchAssets = async () => await apiRequest('ticket/fetch/assets', {id: ticketID}).then(data => parseListAppendCustomer(data)).then(data => setAssets(data))
    const fetchContacts = async () => await apiRequest('ticket/fetch/contacts', {id: ticketID}).then(data => parseListAppendCustomer(data)).then(data => setContacts(data))
    const fetchNotes = async () => await apiRequest('ticket/fetch/notes', {id: ticketID}).then(data => setNotes(data))
    const fetchAllContacts = async () => await apiRequest('customer/fetch/contacts', {id: customerID}).then(data => setAllContacts(data))
    const fetchAllAssets = async () => await apiRequest('customer/fetch/assets', {id: customerID}).then(data => setAllAssets(data))

    const linkContactSubmit = async (contactArray) => await apiRequest('ticket/link_contacts', {ticketID, contactArray}).then(fetchContacts)
    const linkAssetSubmit = async (assetArray) => await apiRequest('ticket/link_assets', {ticketID, assetArray}).then(fetchAssets)

    const postNote = async (note) => await apiRequest('ticket/add_note', {note, id: ticketID}).then(fetchNotes)
    const linkContactForm = (dismiss) => <LinkCustomerContacts dismiss={dismiss} contacts={allContacts} onSubmit={linkContactSubmit}/>
    const linkAssetForm = (dismiss) => <LinkCustomerAssets dismiss={dismiss} assets={allAssets} onSubmit={linkAssetSubmit}/>

    async function load(){
        await fetchTickets().then(fetchCustomers);
        await Promise.all([
            fetchAllContacts(),
            fetchAllAssets(),
            fetchProjects(),
            fetchAssets(),
            fetchContacts(),
            fetchNotes(),
        ])
    }

    useEffect(() => {
        load().then(() => waitSeconds(1000)).then(() => isLoading(false))
    }, []);

    if(loading) return <LoadingScreen />
    console.log(color)
    return  <TicketDataDataContext.Provider value={{notes, projects, assets, contacts, linkContactForm, linkAssetForm, postNote}}>
                <div className={'w-full bg-[#0c0c0c] flex flex-row items-center gap-3'}>
                    <div className={`h-3 w-3 rounded-xl`} style={{backgroundColor: color}}/>
                    <h1 className={'text-white font-bold text-lg hover:underline hover:cursor-pointer'} onClick={()=>{nav(`/customer/${customer._id}`)}}>{customer.name}</h1>
                </div>
                <Item tabIndexes={tabIndex} title={name} id={ticketID} color={'black'} useParentContext={useTicketDataContext}/>
            </TicketDataDataContext.Provider>
}
