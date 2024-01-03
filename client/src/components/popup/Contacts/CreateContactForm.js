import React, {useRef, useState} from "react"
import '../../../css/modals.css'
import {useContactListContext} from "../../../contexts/TableContexts/ContactContext";
import {validateInput, validateJSONObj} from "../../../helpers/misc/miscHelpers";
import {apiRequest} from "../../../helpers/api/apiFunctionHelpers";

function CreateContactForm({dismiss, useParentContext}){


    const {customers, createContact} = useParentContext();

    const name = useRef();
    const email = useRef();
    const phone = useRef();

    return (<>
        <div className={'modalBackground'}>
            <div className={'flex flex-col items-left bg-gray-400 p-10 gap-5 w-[20%] rounded border-black border-[1px] shadow'}>
                <h1 className={'text-left font-bold'}>{customers[0]?.name} &middot; New Contact</h1>

                <input className={'border-black border-[1px] p-1 rounded'} placeholder={'Contact Name'} ref={name}/>
                <input className={'border-black border-[1px] p-1 rounded'} placeholder={'Email Address'} ref={email}/>
                <input className={'border-black border-[1px] p-1 rounded'} placeholder={'Phone Number'} ref={phone}/>

                <div className={'flex flex-row gap-2'}>
                    <h2 className={'bg-blue-500 w-fit px-3 py-1 border-black border-[1px] rounded shadow font-bold hover:bg-blue-600 hover:cursor-pointer transition-all text-white'} onClick={() => {
                        const entryObj = {name: name.current.value, email: email.current.value, phone: phone.current.value, customerID: customers[0]?._id}
                        if(!validateJSONObj(entryObj))
                            return alert('Form incomplete')
                        createContact(entryObj).then(dismiss)
                    }}>Create</h2>
                    <h2 className={'bg-gray-500 w-fit px-3 py-1 border-black border-[1px] rounded shadow font-bold hover:bg-gray-600 hover:cursor-pointer transition-all text-white'} onClick={dismiss}>Cancel</h2>
                </div>
            </div>
        </div>
    </>)
}

export default CreateContactForm