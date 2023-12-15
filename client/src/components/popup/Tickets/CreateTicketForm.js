import React, {useEffect, useState} from "react"
import '../../../css/modals.css'
import {useTicketListContext} from "../../../contexts/TicketList/TicketListContext";
import {removeDuplicates, validateInput} from "../../../helpers/misc/miscHelpers";
import {apiRequest} from "../../../helpers/api/apiFunctionHelpers";

function CreateTicketForm({dismiss}){

    const context = useTicketListContext();

    const [subject, setSubject] = useState("")
    const [desc, setDesc] = useState("")

    const [customerID, setCustomerID] = useState("")
    const [projectID, setProjectID] = useState("")

    // console.log(contacts)

    async function createTicket(){
        if(!validateInput([subject, desc, customerID])) return;
        const body = {
            subject, desc, customerID, projectID
        }
        await apiRequest('ticket/new', body)
        await context.load().then(dismiss)
    }

    return (
        <div className={'modalBackground'}>
            <div className={'modalContainer'}>
                <h2 id={'closeButton'} onClick={() => {dismiss()}}>X</h2>
                <h1 style={{textAlign: 'center'}}>Create New Ticket</h1>

                <input placeholder={'Ticket Subject'} defaultValue={subject} onChange={(e) => {setSubject(e.target.value)}}/>

                <textarea placeholder={'Problem description'} defaultValue={desc} onChange={(e) => {setDesc(e.target.value)}}/>

                <div>
                    <select onChange={({target}) => { setCustomerID(target.value) }} style={{height: 40}}>
                        <option value={null}>Select Customer</option>
                        {
                            context.customers.map(e => {
                                return <option value={e?._id}>{e?.name}</option>
                            })
                        }
                    </select>
                </div>

                <div>
                    <select onChange={({target}) => { setProjectID(target.value) }} style={{height: 40}}>
                        <option value={null}>Select Project</option>
                        {
                            context.projects.filter(g => g?.customer[0]?._id === customerID).map(e => {
                                return <option value={e?._id}>{e?.projectName}</option>
                            })
                        }
                    </select>
                </div>


                <div id={'buttonRow'}>
                    <h2 style={{textAlign: 'center'}} onClick={createTicket}>Create</h2>
                </div>

            </div>
        </div>
    )
}

export default CreateTicketForm