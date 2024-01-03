import {createContext, useContext, useEffect, useState} from "react";
import Item from "../../pages/item/Item";
import {useNavigate, useParams} from "react-router-dom";
import {apiRequest} from "../../helpers/api/apiFunctionHelpers";
import {parseListAppendCustomer, waitSeconds} from "../../helpers/misc/miscHelpers";
import LoadingScreen from "../../components/Loading/LoadingScreen";

const _EndpointDataContext = createContext()
export function useEndpointDataContext(){
    return useContext(_EndpointDataContext)
}
export function EndpointDataContext(){
    const [loading, isLoading] = useState(true)
    const tableHeaders = ['logs', 'projects']
    const nav = useNavigate()
    const [logs, setLogs] = useState([])
    const [endpoint, setEndpoint] = useState({})
    const [projects, setProjects] = useState([])
    const [customer, setCustomer] = useState({})
    const {endpointID} = useParams();


    const fetchLogs = async () => await apiRequest('endpoint/fetch/logs', {id: endpointID}).then(data => setLogs(data));
    const fetchEndpoint = async () => await apiRequest('endpoint/fetch/endpoints', {id: endpointID}).then(data => setEndpoint(data[0]))
    console.log(endpointID)

    async function load(){
        await Promise.all([
            fetchLogs(),
            fetchEndpoint(),
            waitSeconds(1000)
        ])
    }
    useEffect(() => {
        try{
            for(const p of endpoint?.project){
                p.company = endpoint.customer.name
                p.color = endpoint.customer.color
            }
            setProjects(endpoint.project)
            setCustomer(endpoint.customer)
        } catch (e) {

        }
    }, [endpoint])
    useEffect(() => {load().then(() => isLoading(false))}, []);

    if(loading) return <LoadingScreen />
    return <_EndpointDataContext.Provider value={{notes: [], logs, projects}}>
        <div className={'w-full bg-[#0c0c0c] flex flex-row items-center gap-3'}>
            <div className={`h-3 w-3 rounded-xl`} style={{backgroundColor: customer?.color}}/>
            <h1 className={'text-white font-bold text-lg hover:underline hover:cursor-pointer'} onClick={()=>{nav(`/customer/${customer?._id}`)}}>{customer?.name}</h1>
        </div>
        <Item tabIndexes={tableHeaders} useParentContext={useEndpointDataContext} title={'/' + endpoint?.endpointName}/>
    </_EndpointDataContext.Provider>
}