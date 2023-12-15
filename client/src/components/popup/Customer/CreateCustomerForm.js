import React, {useState} from "react"
import {validateInput} from "../../../helpers/misc/miscHelpers";
import {apiRequest} from "../../../helpers/api/apiFunctionHelpers";
import {useNavigate} from "react-router-dom";
import {useCustomerListContext} from "../../../contexts/CustomerList/CustomerListContext";

function CreateCustomerForm({dismiss}){

    const colors = ["#FF5252", "#536DFE", "#FF4081", "#40C4FF", "#FFAB40", "#4CAF50", "#FFD740", "#7C4DFF" ];

    const {load} = useCustomerListContext()

    const [customerName, setCustomerName] = useState("")
    const [customerEmail, setCustomerEmail] = useState("")
    const [customerPhone, setCustomerPhone] = useState("")
    const [color, setColor] = useState(colors[0])


    const nav = useNavigate()

    async function createSubmit(){
        if(!validateInput([customerName])) return;
        try{
            const {insertedId} = await apiRequest('customer/new', {customerName, customerEmail, customerPhone, color})
            await load().then(dismiss)
        } catch (e) {
            alert(e)
        }
    }

    return (
            <div className={'modalContainer'}>
                <h2 id={'closeButton'} onClick={() => {dismiss()}}>X</h2>
                <span className={'flexRowAlignCenter'} style={{justifyContent: 'center'}}>
                    <div style={{width: 20, height: 20, backgroundColor: color, borderRadius: 10}}/>
                    <h1 style={{textAlign: 'center', margin: 0, color: 'white'}}>Create New Customer</h1>
                </span>


                <input
                    placeholder={'Company Name'}
                    defaultValue={customerName}
                    onChange={(e) => {setCustomerName(e.target.value)}}
                />
                <input
                    placeholder={'Company Email'}
                    defaultValue={customerEmail}
                    onChange={(e) => {setCustomerEmail(e.target.value)}}
                />
                <input
                    placeholder={'Company Phone'}
                    defaultValue={customerPhone}
                    onChange={(e) => {setCustomerPhone(e.target.value)}}
                />





                <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center'}}>
                    {
                        colors.map((e, ind) => {
                            const bc = e === color ? 'white' : 'transparent'

                            return <div onClick={()=>{setColor(e)}} style={{display: 'flex', width: '10%', aspectRatio: 1, backgroundColor: e, borderWidth: 4, borderColor: bc, borderRadius: 20}} />
                        })
                    }
                    <input
                        type={'color'}
                        style={{height: 30, width: 30, padding: 0, borderRadius: 10}}
                        onChange={({target}) => {setColor(target.value)}}
                    />
                </div>


                <div id={'buttonRow'}>
                    <h2 style={{textAlign: 'center'}} onClick={createSubmit}>Create</h2>
                </div>
            </div>
    )
}

export default CreateCustomerForm