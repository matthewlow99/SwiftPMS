import React, {useState} from "react"
import '../../../css/modals.css'
import {useAssetListContext} from "../../../contexts/AssetContext/AssetListContext";
import {validateInput} from "../../../helpers/misc/miscHelpers";
import {apiRequest} from "../../../helpers/api/apiFunctionHelpers";

function CreateAssetForm({dismiss}){


    const [assetType, setAssetType] = useState("")
    const [assetName, setAssetName] = useState("")
    const [customerID, setCustomerID] = useState("")
    const [assetTagID, setAssetTagID] = useState("")

    const {customers, load} = useAssetListContext();

    async function create(){
        if(!validateInput([assetType, assetName, customerID])) return;

        const body = {
            assetName,
            assetType,
            customerID,
            assetTagID,
            notes: [],
            tickets: [],
            projects: []
        }

        await apiRequest('asset/new', body).then(dismiss).then(load)
    }

    return (<>
        <div className={'modalBackground'}>
            <div className={'modalContainer'}>
                <h2 id={'closeButton'} onClick={() => {dismiss()}}>X</h2>
                <h1 style={{textAlign: 'center', margin: 0}}>Create New Asset</h1>

                <div>
                    <select style={{height: 40}} onChange={({target}) => {setCustomerID(target.value)}}>
                        <option value={null}>Select Customer</option>
                        {
                            customers.map(e => {
                                return <option value={e._id}>{e.name}</option>
                            })
                        }
                    </select>
                </div>
                <input placeholder={'Asset Name'} defaultValue={assetName} onChange={({target}) => {setAssetName(target.value)}}/>
                <input placeholder={'Asset ID Tag'} defaultValue={assetTagID} onChange={({target}) => {setAssetTagID(target.value)}}/>
                <div>
                    <select style={{height: 40}} onChange={({target}) => {setAssetType(target.value)}}>
                        <option value={null}>Asset Type</option>
                        <option>Desktop</option>
                        <option>Laptop</option>
                        <option>Account</option>
                        <option>Software</option>
                    </select>
                </div>


                <div id={'buttonRow'}>
                    <h2 style={{textAlign: 'center'}} onClick={create}>Create</h2>
                </div>

            </div>
        </div>
    </>)
}

export default CreateAssetForm