import React, {useState} from "react"
import {useProjectListContext} from "../../../contexts/ProjectContext/ProjectListContext";
import {validateInput} from "../../../helpers/misc/miscHelpers";
import {apiRequest} from "../../../helpers/api/apiFunctionHelpers";

function CreateProjectForm({dismiss}){

    const {customers, load} = useProjectListContext()

    const [name, setName] = useState("")
    const [customerID, setCustomerID] = useState("")
    const [projectType, setProjectType] = useState("")

    async function create(){
        if(!validateInput([name, customerID, projectType])) return;

        const body = {
            name,
            type: projectType,
            customerID
        }

        await apiRequest('project/new', body)
        await load().then(dismiss)
    }

    return (<>
        <div className={'modalBackground'}>
            <div className={'modalContainer'}>
                <h2 id={'closeButton'} onClick={() => {dismiss()}}>X</h2>
                <h1 style={{textAlign: 'center', margin: 0}}>Create New Project</h1>

                <input placeholder={'Project Name'} onChange={({target}) => {setName(target.value)}}/>

                <div>
                    <select style={{height: 40}} onChange={({target}) => {setCustomerID(target.value)}}>
                        <option value={null}>Select Customer</option>
                        {
                            customers.map((e, ind) => {
                                return <option value={e._id}>{e.name}</option>
                            })
                        }
                    </select>
                </div>

                <div>
                    <select style={{height: 40}} onChange={({target}) => {setProjectType(target.value)}}>
                        <option value={null}>Project Type</option>
                        <option>Custom Website</option>
                        <option>Website Maintenance</option>
                        <option>Web App</option>
                        <option>Desktop App</option>
                        <option>Software Suite</option>
                        <option>Misc</option>
                    </select>
                </div>


                <div id={'buttonRow'} onClick={create}>
                    <h2 style={{textAlign: 'center'}} >Create</h2>
                </div>

            </div>
        </div>
    </>)
}

export default CreateProjectForm