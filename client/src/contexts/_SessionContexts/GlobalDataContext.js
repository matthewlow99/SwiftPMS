import {createContext, useContext, useEffect, useState} from "react";
import {apiRequest} from "../../helpers/api/apiFunctionHelpers";
import {parseListAppendCustomer, parseListAppendProject, waitSeconds} from "../../helpers/misc/miscHelpers";
import LoadingScreen from "../../components/Loading/LoadingScreen";
import {useSessionContext} from "./SessionContext";

const _GlobalDataContext = createContext();

export function useGlobalDataContext(){
    return useContext(_GlobalDataContext)
}

export function GlobalDataContext({children}){

    const {logged} = useSessionContext()

    const [loading, isLoading] = useState(true);

    const [customers, setCustomers] = useState({})
    const [tickets, setTickets] = useState([])
    const [projects, setProjects] = useState([])

    const fetchCustomers = async () => await apiRequest('customer/list').then(data => setCustomers(data)).catch(() => {alert('Error retrieving customer information')})
    const fetchProjects = async () => await apiRequest(`project/list`).then(data => parseListAppendCustomer(data)).then(data => setProjects(data)).catch(() => {})
    const fetchTickets = async () => await apiRequest(`ticket/list`).then(data => parseListAppendCustomer(data)).then(data=>parseListAppendProject(data)).then(data => {setTickets(data)}).catch(() => {})

    useEffect(() => {
        if(logged){
            load().then();
        }
    }, [logged]);

    async function load(){
        await Promise.all([fetchTickets(), fetchProjects(), fetchCustomers(), waitSeconds(1000)]).then(() => isLoading(false))
    }
    async function createCustomer(customerObj){
        await apiRequest('customer/new', customerObj).then(fetchCustomers)
    }

    if(loading) return <LoadingScreen />
    return  <_GlobalDataContext.Provider value={{customers, tickets, projects, createCustomer}}>
        {children}
    </_GlobalDataContext.Provider>
}