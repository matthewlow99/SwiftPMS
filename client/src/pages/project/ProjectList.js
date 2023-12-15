import React, {useState} from "react"
import AssetPageListEntry from "../../components/item/asset/AssetPageListEntry";
import FullscreenModal from "../../components/popup/FullscreenModal";
import CreateAssetForm from "../../components/popup/Assets/CreateAssetForm";
import ProjectListEntry from "./ProjectListEntry";
import CreateProjectForm from "../../components/popup/Projects/CreateProjectForm";
import {useProjectListContext} from "../../contexts/ProjectContext/ProjectListContext";

function ProjectList(){

    const [showCreate, setShowCreate] = useState(false)

    const {projects} = useProjectListContext()

    return (<>
        <div className={'contactPageGridContainer'} >
            <div className={'flexRowAlignCenter'} style={{justifyContent: 'space-between', width: '100%', marginTop: 20, marginBottom: 20}}>
                <p className={'listPageButton'} onClick={() => {setShowCreate(true)}}>+ New Project</p>
                <p>View Closed Tickets</p>
            </div>

            {
                projects.map((e, ind) => {
                    return <ProjectListEntry project={e} key={ind}/>
                })
            }

        </div>
        <FullscreenModal visible={showCreate} formElement={<CreateProjectForm dismiss={()=>{setShowCreate(false)}}/>}/>
    </>)
}

export default ProjectList