import {createContext, useContext, useEffect, useState} from "react";
import Item from "../../pages/item/Item";
import AssetDetailClass from "../../classes/AssetDetailClass";
import {useParams} from "react-router-dom";
import {cloneObject, waitSeconds} from "../../helpers/misc/miscHelpers";
import LoadingScreen from "../../components/Loading/LoadingScreen";
import CustomerDisplayTile from "../../components/item/detail/CustomerDisplayTile";

const _AssetDataContext = createContext()

export function useAssetDataContext(){
    return useContext(_AssetDataContext)
}

export function AssetDataContext(){

    const [asset, setAsset] = useState(new AssetDetailClass(useParams().assetID))
    const [loading, isLoading] = useState(true)

    async function load(){
        await Promise.all([
            asset.loadObject().then(update),
            waitSeconds()
        ]).then(()=>{isLoading(false)})
    }
    async function update(){
        setAsset(cloneObject(asset))
    }
    async function linkContacts(contactArray){
        await asset.linkContacts(contactArray).then(load)
    }
    async function postNote(note){
        await asset.postNote(note).then(load)
    }
    function renderDetailView(){
        return <>
            <CustomerDisplayTile customer={asset.customer}/>
            <div className={'flexRowAlignCenter'} style={{justifyContent: 'flex-start', gap: 30}}>
                <p style={{fontSize: 19, fontWeight: 600}}>Type: {asset.assetType}</p>
                <p style={{fontSize: 19, fontWeight: 600}}>TagID: {asset.assetTagID}</p>
            </div>



        </>
    }

    useEffect(() => { load().then() }, []);


    if(loading) return <LoadingScreen />
    return <_AssetDataContext.Provider value={{renderDetailView, item: asset, linkContacts, postNote}}>
        <Item useContext={useAssetDataContext}/>
    </_AssetDataContext.Provider>
}