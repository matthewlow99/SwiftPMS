import React, {useState} from "react"
import {useParams} from "react-router-dom";

function CreateContactInCustomer({dismiss}){

    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [phone, setPhone] = useState();
    const [customerID, setCustomerID] = useState(useParams().customerID)



    async function create(){
        console.log({name, email, phone, customerID})
    }

    return (<>
        <div className={'modalBackground'}>
            <div className={'modalContainer'}>
                <h2 id={'closeButton'} onClick={() => {dismiss()}}>X</h2>
                <h1 style={{textAlign: 'center', margin: 0}}>Create New Contact</h1>

                <input placeholder={'Contact Name'} defaultValue={name} onChange={({target}) => {setName(target.value)}}/>
                <input placeholder={'Email Address'} defaultValue={email} onChange={({target}) => {setEmail(target.value)}}/>
                <input placeholder={'Phone Number'} defaultValue={phone} onChange={({target}) => {setPhone(target.value)}} />

                <div id={'buttonRow'} onClick={create}>
                    <h2 style={{textAlign: 'center'}}>Create</h2>
                </div>

            </div>
        </div>
    </>)
}

export default CreateContactInCustomer