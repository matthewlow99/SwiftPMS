import React, {createContext, useContext, useEffect, useState} from "react"
import Item from "../../pages/item/Item";
import {useNavigate, useParams} from "react-router-dom";
import ProjectDataClass from "../../classes/ProjectDataClass";
import {cloneObject, waitSeconds} from "../../helpers/misc/miscHelpers";
import LoadingScreen from "../../components/Loading/LoadingScreen";

const _ProjectDataContext = createContext();

export function useProjectDataContext(){
    return useContext(_ProjectDataContext)
}
export function ProjectDataContext(){
    const [loading, isLoading] = useState(true)
    const {projectID} = useParams();
    const [project, setProject] = useState(new ProjectDataClass(projectID))
    const nav = useNavigate()

    async function load(){
        await Promise.all([
            project.loadObject().then(update).catch(() => {nav('/')}),
            waitSeconds()
        ]).then(() => {isLoading(false)})

    }
    function renderDetailView(){
        return <></>
    }
    function update(){
        setProject(cloneObject(project))
    }
    async function postNote(note){
        await project.postNote(note).then(load).catch(() => {nav('/')})
    }
    useEffect(() => {load().then()}, []);

    if(loading) return <LoadingScreen />
    return <_ProjectDataContext.Provider value={{renderDetailView, item: project, postNote}}>
        <Item useContext={useProjectDataContext}/>
    </_ProjectDataContext.Provider>
}