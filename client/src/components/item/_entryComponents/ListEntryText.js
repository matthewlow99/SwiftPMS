import React from "react"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

function ListEntryText({text, icon, color='transparent', flexOverride=1, iconColor='black', bold=false}){
    return (

            <div className={'flex flex-row items-center gap-3'} style={{fontWeight: bold ? 700 : 400}}>
                {icon && <FontAwesomeIcon icon={icon} color={iconColor}/>}
                <p style={{width: 'fit-content'}}>{text}</p>
            </div>

    )
}

export default ListEntryText