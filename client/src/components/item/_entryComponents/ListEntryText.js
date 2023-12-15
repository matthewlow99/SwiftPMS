import React from "react"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

function ListEntryText({text, icon, color='transparent', flexOverride=1}){
    return (
        <div style={{flex: flexOverride, display: 'flex', flexDirection: 'row', justifyContent: 'left'}}>
            <div
                className={'flexRowAlignCenter colorItemBackground'}
                style={{fontWeight: 'bold', color: 'black', width: 'fit-content', justifyContent: 'center', backgroundColor: color }} // Blue text color
            >
                {icon && <FontAwesomeIcon icon={icon} color={'#0a0619'}/>}
                <p style={{width: 'fit-content'}}>{text}</p>
            </div>
        </div>
    )
}

export default ListEntryText