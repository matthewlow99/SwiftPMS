import React from "react"

function CustomerText({name, color}){
    return (
        <div
            className={'flexRowAlignCenter colorItemBackground'}
            style={{backgroundColor: color, width: '15%'}}
        >
            <p>{name}</p>
        </div>
    )
}

export default CustomerText