import React, {createContext, useContext, useEffect, useState} from "react"
import Item from "../../pages/item/Item";
import {useNavigate, useParams} from "react-router-dom";
import ProjectDataClass from "../../classes/ProjectDataClass";
import {
    cloneObject, parseEndpointList,
    parseListAppendCustomer,
    parseListAppendProject,
    waitSeconds
} from "../../helpers/misc/miscHelpers";
import LoadingScreen from "../../components/Loading/LoadingScreen";
import app from "../../App";
import {apiRequest} from "../../helpers/api/apiFunctionHelpers";
import CreateEndpointForm from "../../components/popup/CreateEndpointForm";

const _ProjectDataContext = createContext();

export function useProjectDataContext(){
    return useContext(_ProjectDataContext)
}
export function ProjectDataContext({}){
    const [loading, isLoading] = useState(true)
    const {projectID} = useParams();
    const tabIndex = ['notes', 'tickets', 'endpoints']

    const nav = useNavigate()

    const [customer, setCustomer] = useState({});
    const [project, setProject] = useState({})
    const [notes, setNotes] = useState([])
    const [tickets, setTickets] = useState([])
    const [endpoints, setEndpoints] = useState([])

    const fetchProject = async () => await apiRequest('project/fetch/projects', {id: projectID}).then(data => setProject(data[0]))
    const fetchNotes = async () => await apiRequest('project/fetch/notes', {id: projectID}).then(data => setNotes(data))
    const fetchTickets = async () => await apiRequest('project/fetch/tickets', {id: projectID}).then(data => parseListAppendCustomer(data)).then(data => setTickets(data))
    const fetchEndpoints = async () => await apiRequest('project/fetch/endpoints', {id: projectID}).then(data => parseListAppendProject(data)).then(data => parseListAppendCustomer(data)).then(data => parseEndpointList(data)).then(data => setEndpoints(data))

    const createEndpoint = async (key, handle, name) => {
        const body = {
            key,
            urlHandle: handle,
            name,
            customerID: customer._id,
            projectID
        }
        await apiRequest('endpoint/new', body).then(fetchEndpoints)
    }

    const postNote = async (note) => await apiRequest('project/add_note', {projectID: projectID, note}).then(fetchNotes)
    const createEndpointForm = (dismiss) => <CreateEndpointForm dismiss={dismiss} createFunction={createEndpoint} project={project}/>


    async function load(){
        await Promise.all([
            fetchProject(),
            fetchNotes(),
            fetchTickets(),
            fetchEndpoints()
        ]).then(() => {isLoading(false)})
    }

    useEffect(() => {
        console.log(endpoints)
    }, [endpoints]);

    useEffect(() => { setCustomer(project.customer) }, [project]);
    useEffect(() => {load().then()}, []);

    if(loading) return <LoadingScreen />
    return <_ProjectDataContext.Provider value={{notes, tickets, endpoints, postNote, createEndpointForm}}>
        <div className={'w-full bg-[#0c0c0c] flex flex-row items-center gap-3'}>
            <div className={`h-3 w-3 rounded-xl`} style={{backgroundColor: customer?.color}}/>
            <h1 className={'text-white font-bold text-lg hover:underline hover:cursor-pointer'} onClick={()=>{nav(`/customer/${customer._id}`)}}>{customer.name}</h1>
        </div>
        <Item tabIndexes={tabIndex} title={project.projectName} color={project.customer.color} id={project._id} useParentContext={useProjectDataContext}/>
    </_ProjectDataContext.Provider>
}