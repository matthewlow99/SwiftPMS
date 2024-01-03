import React, {useEffect, useState} from "react"
import '../../../css/modals.css'
import {useTicketListContext} from "../../../contexts/TableContexts/TicketListContext";
import {removeDuplicates, validateInput} from "../../../helpers/misc/miscHelpers";
import {apiRequest} from "../../../helpers/api/apiFunctionHelpers";

function CreateTicketForm({dismiss, useParentContext}){

    const {customers, projects, createTicket} = useParentContext();

    console.log(customers)

    const [subject, setSubject] = useState("")
    const [desc, setDesc] = useState("")

    const [customerID, setCustomerID] = useState(customers.length === 1 ? customers[0]._id : null)
    const [projectID, setProjectID] = useState("")

    async function create(){
        if(!validateInput([subject, desc, customerID])) return;
        const body = {
            subject, desc, customerID, projectID
        }
        await createTicket(body).then(dismiss).catch(() => alert('Error creating ticket'))
    }

    return (
        <div className={'modalBackground'}>
            <div className={'flex flex-col items-left bg-gray-400 p-10 gap-5 w-[20%] rounded border-black border-[1px] shadow'}>
                <h1 className={'text-left font-bold'}>Create New Ticket</h1>
                <input className={'border-black border-[1px] p-1 rounded'} placeholder={'Ticket Subject'} defaultValue={subject} onChange={(e) => {setSubject(e.target.value)}}/>

                <textarea className={'border-black border-[1px] p-1 rounded'} placeholder={'Problem description'} defaultValue={desc} onChange={(e) => {setDesc(e.target.value)}}/>

                <div>
                    <select onChange={({target}) => { setCustomerID(target.value) }} className={'w-full py-2 rounded border-[1px] border-black'}>
                        <option value={customers.length === 1 ? customers[0]._id : null}>{customers.length === 1 ? customers[0].name : "Select a company"}</option>
                        {
                            customers.length >= 1 && customers.map(e => {
                                return <option value={e?._id}>{e?.name}</option>
                            })
                        }
                    </select>
                </div>

                <div>
                    <select onChange={({target}) => { setProjectID(target.value) }} className={'w-full py-2 rounded border-[1px] border-black'}>
                        <option value={null}>Select Project</option>
                        {
                            projects.filter(g => g?.customer?._id === customerID).map(e => {
                                return <option value={e?._id}>{e?.projectName}</option>
                            })
                        }
                    </select>
                </div>


                <div className={'flex flex-row gap-2'}>
                    <h2 className={'bg-blue-500 w-fit px-3 py-1 border-black border-[1px] rounded shadow font-bold hover:bg-blue-600 hover:cursor-pointer transition-all text-white'} onClick={create}>Create</h2>
                    <h2 className={'bg-gray-500 w-fit px-3 py-1 border-black border-[1px] rounded shadow font-bold hover:bg-gray-600 hover:cursor-pointer transition-all text-white'} onClick={dismiss}>Cancel</h2>
                </div>

            </div>
        </div>
    )
}

export default CreateTicketForm