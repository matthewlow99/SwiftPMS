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
        // await apiRequest('customer/fetch', {customerID: this.objectID}).then(data => {
        //     this.projects = data.projects;
        //     this.tickets = data.tickets;
        //     this.contacts = data.contacts;
        //     this.assets = data.assets;
        //     this.notes = data.notes;
        //     this.title = data.name;
        //     this.color = data.color;
        // })
        await Promise.all([
            this.fetchNotes(),
            this.fetchContacts(),
            this.fetchAssets(),
            this.fetchTickets(),
            this.fetchProjects(),
            this.fetch()
        ])
        console.log(this)
    }
    async fetchTickets(){
        await apiRequest('customer/fetch/tickets',{customerID: this.objectID}).then(data => {
            this.tickets = this.linkProjectsToTickets()
            for(const ticket of this.tickets){
                ticket.color = this.color;
                ticket.company = this.title;
                ticket.projectName = ticket.project.projectName;
            }
        })
    }
    async fetchNotes(){
        await apiRequest('customer/fetch/notes', {customerID: this.objectID}).then(data => this.notes = data)
    }
    async fetchProjects(){
        await apiRequest('customer/fetch/projects', {customerID: this.objectID}).then(data => this.projects = data)
    }
    async fetchContacts(){
        await apiRequest('customer/fetch/contacts', {customerID: this.objectID}).then(data => this.contacts = data)
    }
    async fetchAssets(){
        await apiRequest('customer/fetch/assets', {customerID: this.objectID}).then(data => this.assets = data)
    }
    async fetch(){
        await apiRequest('customer/fetch', {customerID: this.objectID}).then(data => {
            this.title = data.name;
            this.color = data.color;
        })
    }
    getTickets(){
        this.tickets = this.linkProjectsToTickets()
        for(const ticket of this.tickets){
            ticket.color = this.color;
            ticket.company = this.title;
            ticket.projectName = ticket.project.projectName;
        }
        return this.tickets;
    }
    getProjects(){
        for(const project of this.projects){
            project.company = this.title;
            project.color = this.color;
        }
        return this.projects;
    }
    getAssets(){
        console.log(this.assets)
    }


    async postNote(note){
        await apiRequest('customer/add_note', {customerID: this.objectID, note}).then(() => {})
    }



}
export default CustomerDetailClass