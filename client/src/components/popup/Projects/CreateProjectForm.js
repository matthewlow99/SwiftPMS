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

        await apiRequest('project/new', body).then(() => load).then(dismiss)
    }

    return (<>
        <div className={'modalBackground'}>
            <div className={'flex flex-col w-[20%] gap-5 bg-gray-400 p-5 rounded border-black border-[1px] shadow'}>
                <h1 className={'text-left font-bold'}>Create New Project</h1>
                <input className={'border-black border-[1px] p-1'} placeholder={'Project Name'} onChange={({target}) => {setName(target.value)}}/>
                <div>
                    <select className={'w-full p-1 border-black border-[1px]'} onChange={({target}) => {setCustomerID(target.value)}}>
                        <option value={null}>Select Customer</option>
                        {
                            customers.map((e, ind) => {
                                return <option value={e._id}>{e.name}</option>
                            })
                        }
                    </select>
                </div>

                <div>
                    <select className={'w-full p-1 border-black border-[1px]'} onChange={({target}) => {setProjectType(target.value)}}>
                        <option value={null}>Project Type</option>
                        <option>Custom Website</option>
                        <option>Website Maintenance</option>
                        <option>Web App</option>
                        <option>Desktop App</option>
                        <option>Software Suite</option>
                        <option>Misc</option>
                    </select>
                </div>


                <div className={'flex flex-row gap-2'}>
                    <h2 className={'bg-blue-500 w-fit px-3 py-1 border-black border-[1px] rounded shadow font-bold hover:bg-blue-600 hover:cursor-pointer transition-all text-white'} onClick={create}>Create</h2>
                    <h2 className={'bg-gray-500 w-fit px-3 py-1 border-black border-[1px] rounded shadow font-bold hover:bg-gray-600 hover:cursor-pointer transition-all text-white'} onClick={dismiss}>Cancel</h2>
                </div>

            </div>
        </div>
    </>)
}

export default CreateProjectForm