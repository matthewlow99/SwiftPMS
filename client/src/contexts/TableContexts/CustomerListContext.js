import {createContext, useContext, useEffect, useState} from "react";
import {apiRequest} from "../../helpers/api/apiFunctionHelpers";
import LoadingScreen from "../../components/Loading/LoadingScreen";
import {useNavigate} from "react-router-dom";
import TableList from "../../components/tables/TableList";
import CreateCustomerForm from "../../components/popup/Customer/CreateCustomerForm";

const _CustomerListContext = createContext()

export function useCustomerListContext(){
    return useContext(_CustomerListContext)
}

export function CustomerListContext({children}){
    const [loading, isLoading] = useState(true)
    const [customers, setCustomers] = useState([])

    const createForm = (dismiss) => <CreateCustomerForm dismiss={dismiss}/>

    const nav = useNavigate()

    const table_map = {'COMPANY NAME': 'name', 'EMAIL ADDRESS': 'email', 'PHONE NUMBER': 'phone', 'STATUS': 'status'};
    useEffect( () => {
        load().then(() => {isLoading(false)})
    }, []);

    async function load(){
        await apiRequest('customer/list').then(data => {setCustomers(data)}).catch(() => {nav('/')})
    }
    async function createNew(customerName, customerEmail, customerPhone){
        await apiRequest('customer/new', {customerName, customerEmail, customerPhone, color: '#FFFFFF'}).then(load)
    }

    if(loading) return <LoadingScreen />;
    return <_CustomerListContext.Provider value={{customers, load, createNew}}>
        <TableList list={customers} keyMap={table_map} navPrefix={'customer'} createForm={createForm}/>
    </_CustomerListContext.Provider>
}

export default CustomerListContext