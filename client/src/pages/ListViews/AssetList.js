import React from "react"
import TableList from "../../components/tables/TableList";
import CreateAssetForm from "../../components/popup/Assets/CreateAssetForm";

function AssetList({useParentContext}){

    const {assets, createAssetForm= null, linkAssetForm=null} = useParentContext();
    const keyMap = {'COMPANY NAME':'company', 'ASSET NAME': 'assetName', 'ASSET TAG': 'assetTagID', 'ASSET TYPE': 'assetType'}

    return <TableList list={assets} keyMap={keyMap} createForm={createAssetForm} linkForm={linkAssetForm} navPrefix={'asset'}/>
}

export default AssetList