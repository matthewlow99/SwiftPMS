import React, {useState} from "react"
import FullscreenModal from "../../components/popup/FullscreenModal";
import {useEndpointsListContext} from "../../contexts/EndpointsContext/EndpointsListContext";

function EndpointList(){
    const [showCreate, setShowCreate] = useState(false)

    // const {tickets} = useEndpointsListContext()
    const tickets = [];

    return (
        <>
            <div className={'flex'}>
                <div className={'flexRowAlignCenter'} style={{justifyContent: 'space-between', width: '100%', marginTop: 20, marginBottom: 20}}>
                    <p className={'listPageButton'} onClick={() => {setShowCreate(true)}}>+ Create new Endpoint</p>
                    <p>View Closed Tickets</p>
                </div>

            </div>
            {/*<FullscreenModal visible={showCreate} formElement={<CreateTicketForm dismiss={() => {setShowCreate(false)}}/>}/>*/}
        </>
    )
}

export default EndpointList