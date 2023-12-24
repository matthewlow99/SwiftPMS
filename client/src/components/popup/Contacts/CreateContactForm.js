import React, {useRef, useState} from "react"
import '../../../css/modals.css'
import {useContactListContext} from "../../../contexts/ContactContext/ContactContext";
import {validateInput, validateJSONObj} from "../../../helpers/misc/miscHelpers";
import {apiRequest} from "../../../helpers/api/apiFunctionHelpers";

function CreateContactForm({dismiss, submit=async ()=>{alert('Submit not Provided')}}){

    const name = useRef();
    const email = useRef();
    const phone = useRef();



    // async function create(){
    //     if(!validateInput([name, customerID])) return;
    //
    //     try{
    //         const body = {name, email, phone, customerID}
    //         await apiRequest('contact/new', body)
    //         await load().then(dismiss)
    //     } catch (e) {
    //         alert(e)
    //     }
    // }
    return (<>
        <div className={'modalBackground'}>
            <div className={'modalContainer'}>
                <h2 id={'closeButton'} onClick={() => {dismiss()}}>X</h2>
                <h1 style={{textAlign: 'center', margin: 0}}>Create New Contact</h1>

                <input placeholder={'Contact Name'} ref={name}/>
                <input placeholder={'Email Address'} ref={email}/>
                <input placeholder={'Phone Number'} ref={phone}/>

                <div id={'buttonRow'}>
                    <h2 style={{textAlign: 'center'}} onClick={()=>{
                        const entryObj = {name: name.current.value, email: email.current.value, phone: phone.current.value}
                        if(!validateJSONObj(entryObj))
                            return alert('Form incomplete')
                        return submit(entryObj).then(dismiss)
                    }}>Create</h2>
                </div>

            </div>
        </div>
    </>)
}

export default CreateContactForm