import React, {createContext, useContext, useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import Item from "../../pages/item/Item";
import {
    parseListAppendCustomer,
    parseListAppendProject,
    waitSeconds
} from "../../helpers/misc/miscHelpers";
import LoadingScreen from "../../components/Loading/LoadingScreen";
import {apiRequest} from "../../helpers/api/apiFunctionHelpers";
import CreateTicketForm from "../../components/popup/Tickets/CreateTicketForm";
import asset from "../../pages/asset/Asset";
import CreateProjectForm from "../../components/popup/Projects/CreateProjectForm";
import CreateAssetForm from "../../components/popup/Assets/CreateAssetForm";
import CreateContactForm from "../../components/popup/Contacts/CreateContactForm";


const _CustomerDataContext = createContext()

export function useCustomerDataContext(){
    return useContext(_CustomerDataContext)
}
export function CustomerDataContext({children}){
    const [loading, isLoading] = useState(true)
    const {customerID} = useParams();
    const tabIndexes=['notes', 'tickets', 'projects', 'contacts', 'assets']

    const [name, setName] = useState("")
    const [color, setColor] = useState("")
    const [notes, setNotes] = useState([])
    const [customers, setCustomers] = useState({})
    const [tickets, setTickets] = useState([])
    const [projects, setProjects] = useState([])
    const [assets, setAssets] = useState([])
    const [contacts, setContacts] = useState([])

    const fetchCustomers = async () => {await apiRequest('customer/fetch/customers', {id: customerID}).then(data => {
        setCustomers(data)
        setName(data[0]?.name)
        setColor(data[0]?.color)
    }).catch(() => {alert('Error retrieving customer information')})}

    const fetchProjects = async () => {await apiRequest(`customer/fetch/projects`, {id: customerID}).then(data => parseListAppendCustomer(data)).then(data => setProjects(data)).catch(() => {})}
    const fetchTickets = async () => {await apiRequest(`customer/fetch/tickets`, {id: customerID}).then(data => parseListAppendCustomer(data)).then(data=>parseListAppendProject(data)).then(data => {setTickets(data)}).catch(() => {})}
    const fetchAssets = async () => {await apiRequest('customer/fetch/assets', {id: customerID}).then(data => parseListAppendCustomer(data)).then(data => setAssets(data))}
    const fetchContacts = async () => {await apiRequest('customer/fetch/contacts', {id: customerID}).then(data => parseListAppendCustomer(data)).then(data => setContacts(data))}
    const fetchNotes = async () => {await apiRequest('customer/fetch/notes', {id: customerID}).then(data => setNotes(data))}

    const createTicketForm = (dismiss) => <CreateTicketForm dismiss={dismiss} useParentContext={useCustomerDataContext}/>
    const createProjectForm = (dismiss) => <CreateProjectForm dismiss={dismiss} useParentContext={useCustomerDataContext}/>
    const createAssetForm = (dismiss) => <CreateAssetForm dismiss={dismiss} useParentContext={useCustomerDataContext}/>
    const createContactForm = (dismiss) => <CreateContactForm dismiss={dismiss} useParentContext={useCustomerDataContext}/>

    useEffect(() => load, [])

    async function load(){
        await Promise.all([fetchCustomers(), fetchAssets(), fetchNotes(), fetchContacts(), fetchTickets(), fetchProjects(), waitSeconds(1000)]).then(() => isLoading(false))
    }
    async function postNote(note){ await apiRequest('customer/add_note', {note, id: customerID}).then(fetchNotes) }
    async function createTicket(ticketObj){ await apiRequest('ticket/new', ticketObj).then(fetchTickets) }
    async function createProject(projectObj){ await apiRequest('project/new', projectObj).then(fetchProjects) }
    async function createContact(contactObj){ await apiRequest('contact/new', contactObj).then(fetchContacts) }
    async function createAsset(assetObj){ await apiRequest('asset/new', assetObj).then(fetchAssets) }

    if(loading) return <LoadingScreen />
    return <_CustomerDataContext.Provider value={
        {id: customerID, name, color, customers, tickets, projects, contacts, assets, notes, postNote, createTicket, createProject, createContact, createAsset, createAssetForm, createTicketForm, createProjectForm, createContactForm}
    }>
        <Item tabIndexes={tabIndexes}  title={name || 'Loading'} color={color} id={customerID} useParentContext={useCustomerDataContext}/>
    </_CustomerDataContext.Provider>
}