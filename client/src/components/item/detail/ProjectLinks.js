import React from "react"
import TicketProjectLink from "./TicketProjectLink";
import {useNavigate} from "react-router-dom";

function ProjectLinks({projects}){

    const nav = useNavigate()

    return (
        <div style={{flex: 1}}>
            <h3>Currently Open Projects:</h3>
            {
                projects?.map((e, ind) => {
                    return <TicketProjectLink navFunction={()=>{nav(`/project/${e._id}`)}} status={e.status} isOpen={e.isOpen} projectName={e.projectName} />
                })
            }
        </div>
    )
}

export default ProjectLinks