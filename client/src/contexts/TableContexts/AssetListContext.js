import {createContext, useContext, useEffect, useState} from "react";
import {apiRequest} from "../../helpers/api/apiFunctionHelpers";
import LoadingScreen from "../../components/Loading/LoadingScreen";
import {useNavigate} from "react-router-dom";
import {filterArrayByKey, parseListAppendCustomer} from "../../helpers/misc/miscHelpers";
import TableList from "../../components/tables/TableList";
import CreateAssetForm from "../../components/popup/Assets/CreateAssetForm";

const AssetListDataContext = createContext();

export function useAssetListContext(){
    return useContext(AssetListDataContext)
}
export function AssetListContext({urlPrefix, id}){
    const [loading, isLoading] = useState(true)
    const [assets, setAssets] = useState([])
    const [customers, setCustomers] = useState([])
    const nav = useNavigate();

    const keyMap = {'COMPANY NAME':'company', 'ASSET NAME': 'assetName', 'ASSET TAG': 'assetTagID', 'ASSET TYPE': 'assetType'}

    const createForm = (dismiss) => <CreateAssetForm dismiss={dismiss}/>

    useEffect(() => {
        load().then()
    }, []);

    async function load(){
        const [assets_response, customers_response] = await Promise.all([
            apiRequest(`${urlPrefix}/fetch/assets`, {id}).then(data => parseListAppendCustomer(data)).catch(() => {nav('/')}),
            apiRequest(`${urlPrefix}/fetch/customers`, {id}).catch(() => {nav('/')})
        ])
        setCustomers(customers_response)
        setAssets(assets_response)
        isLoading(false)
    }

    console.log(assets)

    if(loading) return <LoadingScreen />
    return <AssetListDataContext.Provider value={{assets, customers, load}}>
        <TableList keyMap={keyMap} list={assets} createForm={createForm} navPrefix={'asset'}/>
    </AssetListDataContext.Provider>
}