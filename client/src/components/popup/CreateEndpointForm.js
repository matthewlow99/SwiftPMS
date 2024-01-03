import React, {useRef} from "react"

function CreateEndpointForm({dismiss, project, createFunction}){

    const name = useRef();
    const key = useRef();
    const handle = useRef();

    async function createEndpoint(){
        await createFunction(key.current.value, handle.current.value, name.current.value).then(dismiss)
    }

    return (<>
        <div className={'modalBackground'}>
            <div className={'flex flex-col w-[20%] gap-5 bg-gray-400 p-5 rounded border-black border-[1px] shadow'}>
                <h1 className={'text-left font-bold'}>{project && project.projectName} &middot; Create New Endpoint</h1>
                <input ref={name} className={'border-black border-[1px] p-1'} placeholder={'Endpoint Name'} />
                <input ref={handle} className={'border-black border-[1px] p-1'} placeholder={'URL Handle (https://swiftpms.dev/[Tenant ID]/[URL HANDLE])'} />
                <input ref={key} className={'border-black border-[1px] p-1'} placeholder={'Secret Key'} />

                <div className={'flex flex-row gap-2'}>
                    <h2 className={'bg-blue-500 w-fit px-3 py-1 border-black border-[1px] rounded shadow font-bold hover:bg-blue-600 hover:cursor-pointer transition-all text-white'} onClick={createEndpoint}>Create</h2>
                    <h2 className={'bg-gray-500 w-fit px-3 py-1 border-black border-[1px] rounded shadow font-bold hover:bg-gray-600 hover:cursor-pointer transition-all text-white'} onClick={dismiss}>Cancel</h2>
                </div>
            </div>
        </div>
    </>)
}

export default CreateEndpointForm