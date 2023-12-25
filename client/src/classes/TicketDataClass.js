import ItemAbstractClass from "./ItemAbstractClass";
import {apiRequest} from "../helpers/api/apiFunctionHelpers";
import {arrayDifference} from "../helpers/misc/miscHelpers";

class TicketDataClass extends ItemAbstractClass{

    constructor(ticketID) {
        super();
        this.objectID = ticketID;
        this.tickets = null;
    }
    async loadObject(){
        await apiRequest('ticket/fetch', {ticketID: this.objectID}).then(async (data) => {

            console.log(data)

            this.title = data.ticketSubject
            this.projects = data.projects
            this.contacts = data.contacts;
            this.color = data.customer[0].color;
            this.assets = data.assets;
            this.description = data.description;
            this.createdDate = data.createdDate;
            this.customer = data.customer[0];
            this.notes = data.notes;
            this.allContacts = await apiRequest('customer/contacts', {customerID: data.customerID}).then(data => {
                return arrayDifference(data, this.contacts, '_id')
            })
            this.allAssets = await apiRequest('customer/assets', {customerID: data.customerID}).then(data => {
                return arrayDifference(data, this.assets, '_id')
            })
        })
    }
    async postNote(note){
        await apiRequest('ticket/add_note', {ticketID: this.objectID, note})
    }
    async linkContacts(contactArray){
        await apiRequest('ticket/link_contacts', {ticketID: this.objectID, contactArray})
    }
    async linkAssets(assetArray){
        await apiRequest('ticket/link_assets', {ticketID: this.objectID, assetArray})
    }


}
export default TicketDataClass