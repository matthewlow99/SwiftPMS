import ItemAbstractClass from "./ItemAbstractClass";
import {apiRequest} from "../helpers/api/apiFunctionHelpers";
import {arrayDifference} from "../helpers/misc/miscHelpers";

class ProjectDataClass extends ItemAbstractClass {
    constructor(projectID) {
        super();
        this.objectID = projectID;
        this.tickets = [];
    }
    async loadObject(){
        await apiRequest('project/fetch', {projectID: this.objectID}).then(async (data) => {
            this.title = data.projectName
            this.color = 'cyan';
            this.tickets = data.tickets;
            this.notes = data.notes;
            for(const t of this.tickets) {
                t.project = {projectName: this.title}
            }
        })
    }
    async postNote(note){
        await apiRequest('project/add_note', {projectID: this.objectID, note})
    }
}
export default ProjectDataClass