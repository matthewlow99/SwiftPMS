import React, {useState} from "react"
import {validateInput} from "../../../helpers/misc/miscHelpers";
import {apiRequest} from "../../../helpers/api/apiFunctionHelpers";
import {useNavigate} from "react-router-dom";
import {useCustomerListContext} from "../../../contexts/TableContexts/CustomerListContext";

function CreateCustomerForm({dismiss, useParentContext}){

    const {createCustomer} = useParentContext();

    const colors = [
        "#FF5252", // Red
        "#FFAB40", // Orange
        "#FFD740", // Yellow
        "#4CAF50", // Green
        "#40C4FF", // Blue
        "#536DFE", // Indigo
        "#7C4DFF", // Purple
        "#FF4081", // Pink
        "#FF6E40", // Coral (Vibrant)
        "#18FFFF", // Cyan (Vibrant)
        "#FF3D00", // Deep Orange (Vibrant)
        "#64DD17", // Light Green (Vibrant)
        "#AA00FF", // Violet (Vibrant)
    ];

    const [customerName, setCustomerName] = useState("")
    const [customerEmail, setCustomerEmail] = useState("")
    const [customerPhone, setCustomerPhone] = useState("")
    const [color, setColor] = useState(colors[0])


    const nav = useNavigate()

    async function createSubmit(){
        if(!validateInput([customerName])) return;
        try{
            return await createCustomer({customerName, customerEmail, customerPhone, color}).then(dismiss)
            // await apiRequest('customer/new', {customerName, customerEmail, customerPhone, color}).then(() => load()).then(dismiss)
        } catch (e) {
            alert(e)
        }
    }

    return (

            <div className={'bg-gray-400 flex flex-col gap-5 p-10 relative border border-[1px] border-black rounded shadow-xl aspect-[2/1]'}>
                <div className={'flex flex-row gap-3'} >
                    <div style={{width: 20, height: 20, backgroundColor: color, borderRadius: 10}}/>
                    <h1 className={'text-black font-bold text-lg'}>Create New Customer</h1>
                </div>

                <div className={'flex flex-col gap-5 w-[80%]'}>
                    <input
                        placeholder={'Company Name'}
                        defaultValue={customerName}
                        className={'border-black border-[1px] p-1 rounded'}
                        onChange={(e) => {setCustomerName(e.target.value)}}
                    />
                    <input
                        placeholder={'Company Email'}
                        defaultValue={customerEmail}
                        className={'border-black border-[1px] p-1 rounded'}
                        onChange={(e) => {setCustomerEmail(e.target.value)}}
                    />
                    <input
                        placeholder={'Company Phone'}
                        defaultValue={customerPhone}
                        className={'border-black border-[1px] p-1 rounded'}
                        onChange={(e) => {setCustomerPhone(e.target.value)}}
                    />
                </div>

                <div className={'flex flex-row gap-1 items-center bg-gray-700 w-full px-3 py-1 rounded-xl inset-1'}>
                    {
                        colors.map((e, ind) => {
                            const bc = e === color ? 'white' : 'transparent'

                            return <div onClick={()=>{setColor(e)}} style={{display: 'flex', width: '30px', aspectRatio: 1, backgroundColor: e, borderWidth: 2, borderColor: bc, borderRadius: 20}} />
                        })
                    }
                </div>

                <div className={'flex flex-row gap-2'}>
                    <h2 className={'bg-blue-500 w-fit px-3 py-1 border-black border-[1px] rounded shadow font-bold hover:bg-blue-600 hover:cursor-pointer transition-all text-white'} onClick={createSubmit}>Create</h2>
                    <h2 className={'bg-gray-500 w-fit px-3 py-1 border-black border-[1px] rounded shadow font-bold hover:bg-gray-600 hover:cursor-pointer transition-all text-white'} onClick={dismiss}>Cancel</h2>
                </div>
            </div>

    )
}

export default CreateCustomerForm