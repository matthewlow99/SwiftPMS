import ItemAbstractClass from "./ItemAbstractClass";
import {apiRequest} from "../helpers/api/apiFunctionHelpers";
import {getElementByIDFromArray} from "../helpers/misc/miscHelpers";

class CustomerDetailClass extends ItemAbstractClass{

    constructor(id) {
        super();
        this.objectID = id;
        this.allAssets = null;
        this.allContacts = null;
    }
    async loadObject(){
        await apiRequest('customer/fetch', {customerID: this.objectID}).then(data => {
            this.projects = data.projects;
            this.tickets = data.tickets;
            this.contacts = data.contacts;
            this.assets = data.assets;
            this.notes = data.notes;
            this.title = data.name;
            this.color = data.color;
        })
        this.tickets = this.linkProjectsToTickets()
    }
    async postNote(note){
        await apiRequest('customer/add_note', {customerID: this.objectID, note})
    }



}
export default CustomerDetailClass