import {createContext, useContext, useEffect, useState} from "react";
import {apiRequest} from "../../helpers/api/apiFunctionHelpers";
import LoadingScreen from "../../components/Loading/LoadingScreen";
import {useNavigate} from "react-router-dom";
import TableList from "../../components/tables/TableList";
import {filterArrayByKey, parseListAppendCustomer} from "../../helpers/misc/miscHelpers";
import CreateContactForm from "../../components/popup/Contacts/CreateContactForm";

const _ContactContext = createContext();

export function useContactListContext(){
    return useContext(_ContactContext)
}
export function ContactContext({urlPrefix, id}){

    const [loading, isLoading] = useState(true)
    const [contacts, setContacts] = useState([])
    const [customers, setCustomers] = useState([])
    const nav = useNavigate();

    const keyMap = {'COMPANY NAME': 'company', 'CONTACT NAME': 'name', 'CONTACT EMAIL': 'email', 'CONTACT PHONE': 'phone'}

    const createForm = (dismiss) => <CreateContactForm dismiss={dismiss}/>

    async function load(){
        await Promise.all([
            apiRequest(`${urlPrefix}/fetch/customers`, {id}).then(data => {setCustomers(data)}).catch(() => {nav('/')}),
            apiRequest(`${urlPrefix}/fetch/contacts`, {id}).then(data => parseListAppendCustomer(data)).then(data => {setContacts(data)}).catch(() => {nav('/')})
        ]).then(() => {isLoading(false)})
    }

    useEffect(() => {
        isLoading(true)
        load().then()
    }, []);


    console.log(contacts)

    if(loading) return <LoadingScreen />
    return <_ContactContext.Provider value={{contacts, customers, load}}>
        <TableList list={contacts} keyMap={keyMap} createForm={createForm} navPrefix={'contact'}/>
    </_ContactContext.Provider>
}