import React from "react"
import TableList from "../../components/tables/TableList";
import CreateCustomerForm from "../../components/popup/Customer/CreateCustomerForm";

function CustomerList({useParentContext}){
    const {customers, createCustomer} = useParentContext()
    const table_map = {'COMPANY NAME': 'name', 'EMAIL ADDRESS': 'email', 'PHONE NUMBER': 'phone', 'STATUS': 'status'};
    const createForm = (dismiss) => <CreateCustomerForm dismiss={dismiss} useParentContext={useParentContext} />

    return (<TableList list={customers} keyMap={table_map} navPrefix={'customer'} createForm={createForm}/>)
}

export default CustomerList