import React from "react"
import '../../css/app.css'
import {useNavigate, useNavigation} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faDesktop, faTicket, faUser} from "@fortawesome/free-solid-svg-icons";

function Header(){

    const nav = useNavigate()

    return (
        <>
            <div className={'headerContainer'}>
                <div style={{display:"flex", flexDirection: 'row', alignItems: 'bottom', justifyContent: 'left'}}>
                    <img src={require('../../assets/logo_alt_color.png')} style={{aspectRatio: 3.31, height: 90}}/>
                    {/*<h1 style={{margin: 0, flex: 1}}>Clark Real Estate Help Desk</h1>*/}
                </div>

            </div>
            {/*<div style={{borderBottomRightRadius: 10, borderBottomLeftRadius: 10, backgroundColor: 'darkgray', color: 'black'}}>*/}
            {/*    <div className={'headerButtonRow'}>*/}
            {/*        <div style={{display: 'flex', justifyContent: 'space-evenly', gap: 100}}>*/}
            {/*            <p className={'headerButtonText'} onClick={() => {nav('/tickets')}}><FontAwesomeIcon icon={faTicket} style={{marginRight: 5}}/> View Tickets</p>*/}
            {/*            <p className={'headerButtonText'} onClick={() => {nav('/contacts')}}><FontAwesomeIcon icon={faUser} style={{marginRight: 5}}/> Contacts</p>*/}
            {/*            <p className={'headerButtonText'} onClick={() => {nav('/assets')}}><FontAwesomeIcon icon={faDesktop} style={{marginRight: 5}}/> Company Assets</p>*/}
            {/*            <p className={'headerButtonText'}>Backup Monitoring</p>*/}
            {/*        </div>*/}
            {/*        <p className={'headerButtonText'}>Sign Out</p>*/}
            {/*    </div>*/}
            {/*</div>*/}
        </>
    )
}

export default Header