import React from "react"
import TableList from "../../components/tables/TableList";
import CreateContactForm from "../../components/popup/Contacts/CreateContactForm";

function ContactList({useParentContext}){

    const {contacts, createContactForm, linkContactForm=null} = useParentContext();

    const keyMap = {'COMPANY NAME': 'company', 'CONTACT NAME': 'name', 'CONTACT EMAIL': 'email', 'CONTACT PHONE': 'phone'}

    return <TableList list={contacts} navPrefix={'contact'} keyMap={keyMap} createForm={createContactForm} linkForm={linkContactForm}/>
}

export default ContactList