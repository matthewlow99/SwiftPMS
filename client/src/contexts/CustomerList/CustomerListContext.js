import {createContext, useContext, useEffect, useState} from "react";
import {apiRequest} from "../../helpers/api/apiFunctionHelpers";
import LoadingScreen from "../../components/Loading/LoadingScreen";
import {useNavigate} from "react-router-dom";

const _CustomerListContext = createContext()

export function useCustomerListContext(){
    return useContext(_CustomerListContext)
}

export function CustomerListContext({children}){
    const [loading, isLoading] = useState(true)
    const [customers, setCustomers] = useState([])
    const nav = useNavigate()

    useEffect( () => {
        load().then(() => {isLoading(false)})
    }, []);

    async function load(){
        await apiRequest('customer/list').then(data => {setCustomers(data)}).catch(() => {nav('/')})
    }

    if(loading) return <LoadingScreen />;
    return <_CustomerListContext.Provider value={{customers, load}}>
        {children}
    </_CustomerListContext.Provider>
}

export default CustomerListContext