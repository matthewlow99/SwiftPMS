import {createContext, useContext, useEffect, useState} from "react";
import {apiRequest} from "../../helpers/api/apiFunctionHelpers";

const AssetListDataContext = createContext();

export function useAssetListContext(){
    return useContext(AssetListDataContext)
}
export function AssetListContext({children}){
    const [loading, isLoading] = useState(true)
    const [assets, setAssets] = useState([])
    const [customers, setCustomers] = useState([])

    useEffect(() => {
        load().then()
    }, []);

    async function load(){
        const [assets_response, customers_response] = await Promise.all([
            apiRequest('asset/list'),
            apiRequest('customer/list')
        ])
        setCustomers(customers_response)
        setAssets(assets_response)
        isLoading(false)
    }

    if(loading) return <h2>Loading...</h2>
    return <AssetListDataContext.Provider value={{assets, customers, load}}>
        {children}
    </AssetListDataContext.Provider>
}