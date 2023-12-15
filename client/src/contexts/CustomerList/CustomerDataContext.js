import {createContext, useContext, useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import CustomerDetailClass from "../../classes/CustomerDetailClass";
import Item from "../../pages/item/Item";
import {waitSeconds} from "../../helpers/misc/miscHelpers";
import LoadingScreen from "../../components/Loading/LoadingScreen";

const _CustomerDataContext = createContext()

export function useCustomerDataContext(){
    return useContext(_CustomerDataContext)
}
export function CustomerDataContext({children}){
    const [loading, isLoading] = useState(true)
    const [customer, setCustomer] = useState({})

    const obj = new CustomerDetailClass(useParams().customerID)

    async function load(){
        isLoading(true)
        // await obj.loadObject().then(() => {setCustomer(obj)})
        await Promise.all([
            obj.loadObject().then(() => {setCustomer(obj)}),
            waitSeconds()
        ])
        isLoading(false)
    }
    async function update(){
        await obj.loadObject().then(() => {setCustomer(Object.assign({}, obj))})
    }
    async function postNote(note){
        await obj.postNote(note)
        await update();
    }
    function renderDetailView(){
        return <></>
    }
    useEffect(() => {
        load().then()
    }, []);

    if(loading) return <LoadingScreen />
    return <_CustomerDataContext.Provider value={{renderDetailView, item: customer, update, postNote}}>
        <Item useContext={useCustomerDataContext}/>
    </_CustomerDataContext.Provider>
}