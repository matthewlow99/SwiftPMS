import {createContext, useContext, useEffect, useState} from "react";
import {apiRequest} from "../../helpers/api/apiFunctionHelpers";
import LoadingScreen from "../../components/Loading/LoadingScreen";
import {useNavigate} from "react-router-dom";

const _ProjectListContext = createContext()

export function useProjectListContext(){
    return useContext(_ProjectListContext)
}

export function ProjectListContext({children}){

    const [loading, isLoading] = useState(true)
    const [projects, setProjects] = useState([])
    const [customers, setCustomers] = useState([])

    const nav = useNavigate()

    async function load(){
        await Promise.all([
            apiRequest('project/list').then(data => {setProjects(data)}).catch(() => {nav('/')}),
            apiRequest('customer/list').then(data => {setCustomers(data)}).catch(() => {nav('/')})
        ]).then(() => {isLoading(false)})
    }

    useEffect(() => {load().then()}, []);

    if(loading) return <LoadingScreen />
    return <_ProjectListContext.Provider value={{projects, customers, load}}>
        {children}
    </_ProjectListContext.Provider>
}