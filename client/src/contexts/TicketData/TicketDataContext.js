import {createContext, useContext, useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {apiRequest} from "../../helpers/api/apiFunctionHelpers";
import Item from "../../pages/item/Item";
import TicketDataClass from "../../classes/TicketDataClass";
import LoadingScreen from "../../components/Loading/LoadingScreen";
import {cloneObject, waitSeconds} from "../../helpers/misc/miscHelpers";
import CustomerDisplayTile from "../../components/item/detail/CustomerDisplayTile";


const TicketDataDataContext = createContext();
export function useTicketDataContext(){
    return useContext(TicketDataDataContext)
}
export function TicketDataContext(){
    const [loading, isLoading] = useState(true)
    const {ticketID} = useParams();
    const [ticket, setTicket] = useState(new TicketDataClass(ticketID))

    async function load(){
        await Promise.all([
            ticket.loadObject(),
            waitSeconds()
        ]).then(update).then(() => {isLoading(false)})
    }
    function update(){
        setTicket(cloneObject(ticket))
    }
    async function postNote(note){
        await ticket.postNote(note).then(load)
    }
    function renderDetailView(){
        return (
            <div style={{marginTop: 20, marginBottom: 20}}>
                <CustomerDisplayTile customer={ticket.customer}/>
                <h4>Created on {ticket.createdDate}</h4>
                <div>
                    <h4 style={{marginBottom: 10}}>Ticket Description</h4>
                    <p>{ticket.description}</p>
                </div>
            </div>
        )
    }
    async function linkContacts(contactArray){
        await ticket.linkContacts(contactArray).then(load)
    }
    async function linkAssets(assetArray){
        await ticket.linkAssets(assetArray).then(load)
    }
    useEffect(() => {
        load().then()
    }, []);

    if(loading) return <LoadingScreen />
    return  <TicketDataDataContext.Provider value={{item: ticket, postNote, renderDetailView, linkContacts, linkAssets}}>
                <Item useContext={useTicketDataContext}/>
            </TicketDataDataContext.Provider>
}
