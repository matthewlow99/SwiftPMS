import {apiRequest} from "../helpers/api/apiFunctionHelpers";
import {getElementByIDFromArray} from "../helpers/misc/miscHelpers";
import TableList from "../components/tables/TableList";
import CreateTicketForm from "../components/popup/Tickets/CreateTicketForm";

export class ItemDataClass {
    objectID = "";
    fetchUrlPrefix = "";

    customers = [];
    tickets = [];
    notes = [];
    contacts = [];
    assets = [];
    projects = [];

    constructor(objectID, fetchUrlPrefix) {
        this.objectID = objectID;
        this.fetchUrlPrefix = fetchUrlPrefix;
    }
    async fetchTickets(){
        const tickets = await apiRequest(`${this.fetchUrlPrefix}/tickets`, {id: this.objectID})
        tickets.forEach(e => { e.project = getElementByIDFromArray(this.projects, e.projectID) })
        this.tickets = tickets;
        return this.tickets;
    }
    async fetchNotes(){
        this.notes = await apiRequest(`${this.fetchUrlPrefix}/notes`, {id: this.objectID})
        return this.notes;
    }
    async fetchProjects(){
        this.projects = await apiRequest(`${this.fetchUrlPrefix}/projects`, {id: this.objectID})
        return this.projects;
    }
    async fetchCustomers(){
        this.customers = await apiRequest(`${this.fetchUrlPrefix}`, {id: this.objectID})
        return this.customers;
    }
    async fetchContacts(){
        this.contacts = await apiRequest(`${this.fetchUrlPrefix}/contacts`, {id: this.objectID})
        return this.contacts;
    }
    async fetchAssets(){
        this.assets = await apiRequest(`${this.fetchUrlPrefix}/assets`, {id: this.objectID})
        return this.assets;
    }
}