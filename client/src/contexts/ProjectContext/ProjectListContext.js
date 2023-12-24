import {createContext, useContext, useEffect, useState} from "react";
import {apiRequest} from "../../helpers/api/apiFunctionHelpers";
import LoadingScreen from "../../components/Loading/LoadingScreen";
import {useNavigate} from "react-router-dom";
import TableList from "../../components/tables/TableList";
import CreateProjectForm from "../../components/popup/Projects/CreateProjectForm";
import {
    appendColorToObjectList,
    parseListAppendCustomer,
    parseListCustomer,
    parseListForTable
} from "../../helpers/misc/miscHelpers";

const _ProjectListContext = createContext()

export function useProjectListContext(){
    return useContext(_ProjectListContext)
}

export function ProjectListContext({children}){

    const [loading, isLoading] = useState(true)
    const [projects, setProjects] = useState([])
    const [customers, setCustomers] = useState([])

    const keyMap = {'COMPANY NAME': 'company', 'PROJECT NAME': 'projectName', 'PROJECT TYPE': 'projectType', 'START DATE': 'dateCreated'}
    console.log(projects)

    const createProject = (dismiss) => <CreateProjectForm dismiss={dismiss}/>

    const nav = useNavigate()

    async function load(){
        await Promise.all([
            apiRequest('project/list', {}, false, false).then(data=>parseListAppendCustomer(data)).then(data => {setProjects(data)}).catch((e) => {console.log(e)}),
            apiRequest('customer/list',).then(data => {setCustomers(data)}).catch((e) => {console.log(e)})
        ]).then(() => {isLoading(false)})
    }

    useEffect(() => {load().then()}, []);

    if(loading) return <LoadingScreen />
    return <_ProjectListContext.Provider value={{projects, customers, load}}>
        <TableList list={projects} keyMap={keyMap} createForm={createProject} navPrefix={'project'}/>
    </_ProjectListContext.Provider>
}