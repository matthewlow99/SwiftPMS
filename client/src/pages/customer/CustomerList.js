import React, {useState, useRef} from "react"
import TicketListEntry from "../../components/TicketList/TicketListEntry";
import CreateTicketForm from "../../components/popup/Tickets/CreateTicketForm";
import CustomerListEntry from "../../components/item/customer/CustomerListEntry";
import CreateCustomerForm from "../../components/popup/Customer/CreateCustomerForm";
import FullscreenModal from "../../components/popup/FullscreenModal";
import {useCustomerListContext} from "../../contexts/CustomerList/CustomerListContext";
import ListEntryText from "../../components/item/_entryComponents/ListEntryText";
import {faBuilding} from "@fortawesome/free-solid-svg-icons";
import {useNavigate} from "react-router-dom";

function CustomerList(){
    const nav = useNavigate()
    const [showCreate, setShowCreate] = useState(false)
    const {customers, createNew} = useCustomerListContext()


    const customerName = useRef();
    const customerEmail = useRef();
    const customerPhone = useRef();

    return (
            <div  className={'list-view-container'}>

                <table className={'w-full mt-5'}>
                    <thead>
                        <tr>
                            <th className={'text-left w-1/4'}>Company Name</th>
                            <th className={'text-left w-1/4'}>Email Address</th>
                            <th className={'text-left w-1/4'}>Phone Number</th>
                            <th className={'text-left w-1/4'}>Date Created</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        customers.map((c, ind) => {
                            console.log(c.color)
                            console.log(c._id)
                            return  <>
                                <tr className={'list-row'} key={ind} onClick={()=>{nav(`/customer/${c._id}`)}}>
                                    <td className={'custom-table-cell font-bold w-1/4'}><ListEntryText text={c.name} icon={faBuilding} iconColor={c.color} bold={true}/></td>
                                    <td className={'custom-table-cell w-1/4'}>{c.email}</td>
                                    <td className={'custom-table-cell w-1/4'}>{c.phone}</td>
                                    <td className={'custom-table-cell w-1/4'}>{'12/22/23'}</td>
                                </tr>
                            </>
                        })
                    }
                    {
                        showCreate &&
                        <tr>
                            <td className={'custom-table-cell w-1/5'}><input className={'bg-transparent text-left w-full'} type={'text'} placeholder={'Company Name'} ref={customerName}/></td>
                            <td className={'custom-table-cell w-1/5'}><input className={'bg-transparent text-left w-full'} type={'text'} placeholder={'Email'} ref={customerEmail}/></td>
                            <td className={'custom-table-cell w-1/5'}><input className={'bg-transparent text-left w-full'} type={'text'} placeholder={'Phone'} ref={customerPhone}/></td>
                            <td className={'custom-table-cell w-1/5'}><button className={'list-button'} style={{borderRadius: 10}} onClick={()=>{createNew(customerName.current.value, customerEmail.current.value, customerPhone.current.value).then(()=>{setShowCreate(false)})}}>Submit</button></td>
                        </tr>
                    }
                    </tbody>
                </table>
                <div className={'flex flex-row justify-center my-3'}>
                    <button className={'list-button'} style={{borderRadius: 10}} onClick={()=>{setShowCreate(prev=>!prev)}}>+ Add Customer</button>
                    <button className={'list-button'} style={{borderRadius: 10}} onClick={()=>{setShowCreate(true)}}>Show Closed</button>
                </div>
            </div>
    )
}

export default CustomerList