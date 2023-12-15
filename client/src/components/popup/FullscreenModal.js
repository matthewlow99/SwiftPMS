import React from "react"

function FullscreenModal({visible, formElement}){
    if(!visible) return;
    return (
        <div className={'modalBackground'}>
            {formElement}
        </div>
    )
}

export default FullscreenModal