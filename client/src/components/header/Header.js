import React from "react"
import '../../css/app.css'
import {useNavigate, useNavigation} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faDesktop, faTicket, faUser} from "@fortawesome/free-solid-svg-icons";

function Header(){

    const nav = useNavigate()

    return (
        <>
            {/*<div className={'headerContainer'}>*/}
            {/*    <div style={{display:"flex", flexDirection: 'row', alignItems: 'bottom', justifyContent: 'left'}}>*/}
            {/*        <img src={require('../../assets/logo_alt_color.png')} style={{aspectRatio: 3.31, height: 50}}/>*/}
            {/*    </div>*/}
            {/*</div>*/}
        </>
    )
}

export default Header