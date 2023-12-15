import ItemAbstractClass from "./ItemAbstractClass";
import {apiRequest} from "../helpers/api/apiFunctionHelpers";
import {arrayDifference} from "../helpers/misc/miscHelpers";
import contact from "../pages/contact/Contact";

class AssetDetailClass extends ItemAbstractClass{
    constructor(assetID) {
        super();
        this.objectID = assetID;
    }
    async loadObject(){
        await apiRequest('asset/fetch', {assetID: this.objectID}).then(async (data) => {
            this.title = `${data.assetName}`
            this.contacts = [];
            this.contacts = data.contacts;
            this.tickets = data.tickets || [];
            this.notes = data.notes || [];
            this.customer = data.customer[0];
            this.assetType = data.assetType;
            this.assetTagID = data.assetTagID;
            this.allContacts = await apiRequest('customer/contacts', {customerID: data.customerID}).then(data => {
                return arrayDifference(data, this.contacts, '_id')
            })
        })
    }
    async linkContacts(contactArray){
        await apiRequest('asset/link_contacts', {assetID: this.objectID, contactArray})
    }
    async postNote(note){
        await apiRequest('asset/add_note', {assetID: this.objectID, note})
    }

}
export default AssetDetailClass