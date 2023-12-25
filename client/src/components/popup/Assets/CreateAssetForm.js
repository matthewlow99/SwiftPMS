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
            <div className={'flex flex-col items-left bg-gray-400 p-10 gap-5 w-[20%] rounded border-black border-[1px] shadow'}>
                <h1 className={'text-left font-bold'}>Create New Asset</h1>


                <input className={'border-black border-[1px] p-1 rounded'} placeholder={'Asset Name'} defaultValue={assetName} onChange={({target}) => {setAssetName(target.value)}}/>
                <input className={'border-black border-[1px] p-1 rounded'} placeholder={'Asset ID Tag'} defaultValue={assetTagID} onChange={({target}) => {setAssetTagID(target.value)}}/>
                <div>
                    <select className={'w-full py-2 rounded border-[1px] border-black'} onChange={({target}) => {setCustomerID(target.value)}}>
                        <option value={null}>Select Customer</option>
                        {
                            customers.map(e => {
                                return <option value={e._id}>{e.name}</option>
                            })
                        }
                    </select>
                </div>
                <div>
                    <select className={'w-full py-2 rounded border-[1px] border-black'} onChange={({target}) => {setAssetType(target.value)}}>
                        <option value={null}>Asset Type</option>
                        <option>Desktop</option>
                        <option>Laptop</option>
                        <option>Account</option>
                        <option>Software</option>
                    </select>
                </div>


                <div className={'flex flex-row gap-2'}>
                    <h2 className={'bg-blue-500 w-fit px-3 py-1 border-black border-[1px] rounded shadow font-bold hover:bg-blue-600 hover:cursor-pointer transition-all text-white'} onClick={create}>Create</h2>
                    <h2 className={'bg-gray-500 w-fit px-3 py-1 border-black border-[1px] rounded shadow font-bold hover:bg-gray-600 hover:cursor-pointer transition-all text-white'} onClick={dismiss}>Cancel</h2>
                </div>

            </div>
        </div>
    </>)
}

export default CreateAssetForm