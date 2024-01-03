import TableList from "../../components/tables/TableList";

function EndpointList({useParentContext}){
    const {endpoints=[], createEndpointForm} = useParentContext();
    const keyMap = {
        "COMPANY NAME": 'company',
        "ENDPOINT NAME": 'endpointName',
        "PROJECT": 'projectName',
        "URL": 'url',
    }
    return <TableList list={endpoints} navPrefix={'endpoint'} keyMap={keyMap} createForm={createEndpointForm}/>
}
export default EndpointList