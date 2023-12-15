import React, {useState} from "react"
import TicketListEntry from "../../components/TicketList/TicketListEntry";
import CreateTicketForm from "../../components/popup/Tickets/CreateTicketForm";
import CustomerListEntry from "../../components/item/customer/CustomerListEntry";
import CreateCustomerForm from "../../components/popup/Customer/CreateCustomerForm";
import FullscreenModal from "../../components/popup/FullscreenModal";
import {useCustomerListContext} from "../../contexts/CustomerList/CustomerListContext";

function CustomerList(){

    const [showCreate, setShowCreate] = useState(false)
    const {customers} = useCustomerListContext()

    return (
        <>
            <div className={'contactPageGridContainer'}>
                <div className={'flexRowAlignCenter'} style={{justifyContent: 'space-between', width: '100%', marginTop: 20, marginBottom: 20}}>
                    <p className={'listPageButton'} onClick={() => {setShowCreate(true)}}>+ Create New Customer</p>
                    <p>View Closed Tickets</p>
                </div>
                {
                    customers?.map((e, ind) => {
                        return <CustomerListEntry customer={e} key={ind}/>
                    })
                }
            </div>
            <FullscreenModal visible={showCreate} formElement={<CreateCustomerForm dismiss={() => {setShowCreate(false)}}/>}/>
        </>
    )
}

export default CustomerList