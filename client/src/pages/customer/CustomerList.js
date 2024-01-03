import React, {useState, useRef} from "react"
import TicketListEntry from "../../components/TicketList/TicketListEntry";
import CreateTicketForm from "../../components/popup/Tickets/CreateTicketForm";
import CustomerListEntry from "../../components/item/customer/CustomerListEntry";
import CreateCustomerForm from "../../components/popup/Customer/CreateCustomerForm";
import FullscreenModal from "../../components/popup/FullscreenModal";
import {useCustomerListContext} from "../../contexts/TableContexts/CustomerListContext";
import ListEntryText from "../../components/item/_entryComponents/ListEntryText";
import {faBuilding} from "@fortawesome/free-solid-svg-icons";
import {useNavigate} from "react-router-dom";
import TableList from "../../components/tables/TableList";

function CustomerList(){
    const nav = useNavigate()
    const [showCreate, setShowCreate] = useState(false)
    const {customers, createNew} = useCustomerListContext()


    const customerName = useRef();
    const customerEmail = useRef();
    const customerPhone = useRef();

    const map = {'COMPANY NAME': 'name', 'EMAIL ADDRESS': 'email', 'PHONE NUMBER': 'phone', 'STATUS': 'status'};

    return <TableList keyMap={map} list={customers} navPrefix={'customer'} prependedIcon={faBuilding}/>

}

export default CustomerList