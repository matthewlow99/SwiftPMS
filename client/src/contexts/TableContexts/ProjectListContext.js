import {createContext, useContext, useEffect, useState} from "react";
import {apiRequest} from "../../helpers/api/apiFunctionHelpers";
import LoadingScreen from "../../components/Loading/LoadingScreen";
import {useNavigate} from "react-router-dom";
import TableList from "../../components/tables/TableList";
import CreateProjectForm from "../../components/popup/Projects/CreateProjectForm";
import {
    appendColorToObjectList, filterArrayByKey,
    parseListAppendCustomer,
    parseListCustomer,
    parseListForTable
} from "../../helpers/misc/miscHelpers";

const _ProjectListContext = createContext()

export function useProjectListContext(){
    return useContext(_ProjectListContext)
}

export function ProjectListContext({useParentContext}){

    const {customers, projects} = useParentContext()
    const createProject = (dismiss) => <CreateProjectForm dismiss={dismiss}/>
    const keyMap = {'COMPANY NAME': 'company', 'PROJECT NAME': 'projectName', 'PROJECT TYPE': 'projectType', 'START DATE': 'dateCreated'}

    return<TableList list={projects} keyMap={keyMap} createForm={createProject} navPrefix={'project'}/>
}