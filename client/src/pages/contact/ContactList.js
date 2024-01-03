import React, {useState} from "react"
import ContactPageGridEntry from "../../components/item/contact/ContactPageGridEntry";
import CreateContactForm from "../../components/popup/Contacts/CreateContactForm";
import {useContactListContext} from "../../contexts/TableContexts/ContactContext";
import FullscreenModal from "../../components/popup/FullscreenModal";

function ContactList(){

    const [showCreate, setShowCreate] = useState(false)
    const {contacts} = useContactListContext()


    return (
        <>
            <div className={'contactPageGridContainer'}>
                <div className={'flexRowAlignCenter'} style={{justifyContent: 'space-between', width: '100%', marginTop: 20, marginBottom: 20}}>
                    <p className={'listPageButton'} onClick={() => {setShowCreate(true)}}>+ New Contact</p>
                    <p>View Closed Tickets</p>
                </div>

                {
                    contacts.map((e, ind) => {
                        return <ContactPageGridEntry contact={e} key={ind}/>
                    })
                }

            </div>
            <FullscreenModal visible={showCreate} formElement={<CreateContactForm dismiss={() => {setShowCreate(false)}}/>}/>
        </>
    )
}

export default ContactList