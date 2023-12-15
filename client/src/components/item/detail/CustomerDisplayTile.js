import React from "react"
import {useNavigate} from "react-router-dom";

function CustomerDisplayTile({customer}){
    const nav = useNavigate()
    return (<>
        <div className={'colorItemBackground hoverCursor'} style={{backgroundColor: customer?.color}} onClick={() => {nav(`/customer/${customer?._id}`)}}>
            <h3>{customer.name}</h3>
        </div>
    </>)
}

export default CustomerDisplayTile