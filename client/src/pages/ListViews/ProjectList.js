import React from "react"
import CreateProjectForm from "../../components/popup/Projects/CreateProjectForm";
import TableList from "../../components/tables/TableList";

function ProjectList({useParentContext}){
    const {projects, createProjectForm} = useParentContext()

    const keyMap = {'COMPANY NAME': 'company', 'PROJECT NAME': 'projectName', 'PROJECT TYPE': 'projectType', 'START DATE': 'dateCreated'}
    return <TableList list={projects} keyMap={keyMap} createForm={createProjectForm} navPrefix={'project'}/>
}

export default ProjectList