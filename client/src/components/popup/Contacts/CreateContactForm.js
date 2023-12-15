import React, {useState} from "react"
import '../../../css/modals.css'
import {useContactListContext} from "../../../contexts/ContactContext/ContactContext";
import {validateInput} from "../../../helpers/misc/miscHelpers";
import {apiRequest} from "../../../helpers/api/apiFunctionHelpers";

function CreateContactForm({dismiss}){

    const {customers, load} = useContactListContext()

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [customerID, setCustomerID] = useState("")

    async function create(){
        if(!validateInput([name, customerID])) return;

        try{
            const body = {name, email, phone, customerID}
            await apiRequest('contact/new', body)
            await load().then(dismiss)
        } catch (e) {
            alert(e)
        }
    }

    return (<>
        <div className={'modalBackground'}>
            <div className={'modalContainer'}>
                <h2 id={'closeButton'} onClick={() => {dismiss()}}>X</h2>
                <h1 style={{textAlign: 'center', margin: 0}}>Create New Contact</h1>

                <input placeholder={'Contact Name'} defaultValue={name} onChange={({target}) => {setName(target.value)}}/>
                <input placeholder={'Email Address'} defaultValue={email} onChange={({target}) => {setEmail(target.value)}}/>
                <input placeholder={'Phone Number'} defaultValue={phone} onChange={({target}) => {setPhone(target.value)}} />

                <select style={{height: 40}} onChange={({target}) => {setCustomerID(target.value)}}>
                    <option value={""}>Select Customer</option>
                    {
                        customers.map((e, ind) => {
                            return <option value={e?._id}>{e?.name}</option>
                        })
                    }
                </select>


                <div id={'buttonRow'} onClick={create}>
                    <h2 style={{textAlign: 'center'}}>Create</h2>
                </div>

            </div>
        </div>
    </>)
}

export default CreateContactForm