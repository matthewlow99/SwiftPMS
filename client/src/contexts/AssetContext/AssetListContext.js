import {createContext, useContext, useEffect, useState} from "react";
import {apiRequest} from "../../helpers/api/apiFunctionHelpers";
import LoadingScreen from "../../components/Loading/LoadingScreen";
import {useNavigate} from "react-router-dom";

const AssetListDataContext = createContext();

export function useAssetListContext(){
    return useContext(AssetListDataContext)
}
export function AssetListContext({children}){
    const [loading, isLoading] = useState(true)
    const [assets, setAssets] = useState([])
    const [customers, setCustomers] = useState([])
    const nav = useNavigate();


    useEffect(() => {
        load().then()
    }, []);

    async function load(){
        const [assets_response, customers_response] = await Promise.all([
            apiRequest('asset/list').catch(() => {nav('/')}),
            apiRequest('customer/list').catch(() => {nav('/')})
        ])
        setCustomers(customers_response)
        setAssets(assets_response)
        isLoading(false)
    }

    if(loading) return <LoadingScreen />
    return <AssetListDataContext.Provider value={{assets, customers, load}}>
        {children}
    </AssetListDataContext.Provider>
}