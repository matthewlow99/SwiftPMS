import {createContext, useContext, useEffect, useState} from "react";
import {apiRequest} from "../../helpers/api/apiFunctionHelpers";
import LoadingScreen from "../../components/Loading/LoadingScreen";

const _ProjectListContext = createContext()

export function useProjectListContext(){
    return useContext(_ProjectListContext)
}

export function ProjectListContext({children}){

    const [loading, isLoading] = useState(true)
    const [projects, setProjects] = useState([])
    const [customers, setCustomers] = useState([])

    async function load(){
        await Promise.all([
            apiRequest('project/list').then(data => {setProjects(data)}),
            apiRequest('customer/list').then(data => {setCustomers(data)})
        ]).then(() => {isLoading(false)})
    }

    useEffect(() => {load().then()}, []);

    if(loading) return <LoadingScreen />
    return <_ProjectListContext.Provider value={{projects, customers, load}}>
        {children}
    </_ProjectListContext.Provider>
}