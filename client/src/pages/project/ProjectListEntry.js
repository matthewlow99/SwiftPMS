import React from "react"
import ListEntryText from "../../components/item/_entryComponents/ListEntryText";
import {faEnvelope, faPhone} from "@fortawesome/free-solid-svg-icons";
import {useNavigate} from "react-router-dom";

function ProjectListEntry({project}){
    const nav = useNavigate()
    return (
        <div className={'entryContainer'} onClick={()=>{nav(`/project/${project._id}`)}}>
            <ListEntryText text={project?.customer[0]?.name} color={project?.customer[0]?.color}/>
            <div className={'flexRowAlignCenter'} style={{flex: 1}}>
                <ListEntryText text={project?.isOpen ? 'Open' : 'Closed'} color={project?.isOpen ? 'limegreen' : 'red'}/>
                <ListEntryText text={project?.status} color={'cyan'}/>
            </div>
            <ListEntryText text={project?.projectName}/>
            <ListEntryText text={project?.customer[0]?.email} icon={faEnvelope}/>
            <ListEntryText text={project?.customer[0]?.phone} icon={faPhone}/>
        </div>
    )
}

export default ProjectListEntry