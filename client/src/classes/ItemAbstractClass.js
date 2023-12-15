import {getElementByIDFromArray} from "../helpers/misc/miscHelpers";

class ItemAbstractClass {

    notes;
    contacts;
    assets;
    tickets;
    projects;
    objectID;
    title;
    description;
    allAssets;
    allContacts;
    color;
    createdDate;
    email;
    phone;
    customer;
    assetType;
    assetTagID;

    constructor() {
        this.notes = [];
        this.contacts = null;
        this.assets = null;
        this.projects = null;
        this.tickets = null;
        this.allAssets = null;
        this.customer = {};
        this.allContacts = null;
        this.createdDate = "";
        this.objectID = "";
        this.title = "";
        this.description = "";
        this.color = null;
        this.assetType = null;
        this.assetTagID = null;
    }
    async loadObject(){return alert('Object load not implemented')}
    async postNote(){return alert('Note post not implemented')}
    async linkContacts(){return alert('Link contacts not implemented')}
    linkProjectsToTickets(){
        const arr = this.tickets;
        arr.forEach(e => {
            e.project = getElementByIDFromArray(this.projects, e.projectID)
        })
        return arr;
    }


}

export default ItemAbstractClass