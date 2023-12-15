import ItemAbstractClass from "./ItemAbstractClass";
import {apiRequest} from "../helpers/api/apiFunctionHelpers";
import {arrayDifference} from "../helpers/misc/miscHelpers";

class ContactDataClass extends ItemAbstractClass{
    constructor(contactID) {
        super();
        this.objectID = contactID;
    }

    async loadObject() {
        await apiRequest('contact/fetch', {contactID: this.objectID}).then(async (data) => {
            this.title = data.name;
            this.assets = data.assets;
            this.notes = data.notes;
            this.email = data.email;
            this.customer = data.customer[0]
            this.color = this.customer.color;
            this.phone = data.phone;
            this.tickets = [];
            this.allAssets = await apiRequest('customer/assets', {customerID: data.customerID}).then(data => {
                return arrayDifference(data, this.assets, '_id')
            })
            this.contacts = null;
            this.allContacts = null;

        })
    }
    async postNote(note){
        await apiRequest('contact/add_note', {note, contactID: this.objectID})
    }
    async linkAssets(assetArray){
        await apiRequest('contact/link_assets', {assetArray, contactID: this.objectID})
    }
}
export default ContactDataClass