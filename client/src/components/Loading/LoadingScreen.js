import React from "react"

function LoadingScreen(){
    return (
        <div className={'modalBackground'}>
            <img src={require('../../assets/page_load.gif')} style={{width: 50, height: 50}}/>
        </div>
    )
}

export default LoadingScreen