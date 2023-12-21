import React from "react"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faBuilding, faBuildingUser,
    faDesktop,
    faFolder,
    faGear, faList,
    faListDots, faPencil, faSignOut,
    faTicket,
    faUser,
    faUsers
} from "@fortawesome/free-solid-svg-icons";
import {useNavigate} from "react-router-dom";
import {useSessionContext} from "../../contexts/_SessionContexts/SessionContext";
import {faBell} from "@fortawesome/free-solid-svg-icons/faBell";

function SideBar(){

    const nav = useNavigate()
    const {clearTokens} = useSessionContext();
    return (
        <div className={'sidebarContainer'}>
            <p className={'headerButtonText'} onClick={() => {nav('/projects')}} title={'Notifications'}><FontAwesomeIcon icon={faBell} style={{marginRight: 5}}/> </p>
            <p className={'headerButtonText'} onClick={() => {nav('/customers')}} title={'Customers'}><FontAwesomeIcon icon={faBuilding} style={{marginRight: 5}}/> </p>
            <p className={'headerButtonText'} onClick={() => {nav('/tickets')}} title={'Tickets'}><FontAwesomeIcon icon={faTicket} style={{marginRight: 5}}/> </p>
            <p className={'headerButtonText'} onClick={() => {nav('/assets')}} title={'Devices'}><FontAwesomeIcon icon={faDesktop} style={{marginRight: 5}}/> </p>
            <p className={'headerButtonText'} onClick={() => {nav('/contacts')}} title={'Contacts'}><FontAwesomeIcon icon={faBuildingUser} style={{marginRight: 5}}/> </p>
            <p className={'headerButtonText'} onClick={() => {nav('/projects')}} title={'Projects'}><FontAwesomeIcon icon={faFolder} style={{marginRight: 5}}/> </p>
            <p className={'headerButtonText'} onClick={() => {nav('/projects')}} title={'Users'}><FontAwesomeIcon icon={faUsers} style={{marginRight: 5}}/> </p>
            <p className={'headerButtonText'} onClick={() => {nav('/projects')}} title={'Logs'}><FontAwesomeIcon icon={faPencil} style={{marginRight: 5}}/> </p>
            <p className={'headerButtonText'} onClick={() => {nav('/projects')}} title={'Settings'}><FontAwesomeIcon icon={faGear} style={{marginRight: 5}}/> </p>
            <p className={'headerButtonText'} onClick={() => {nav('/projects')}} title={'User Profile'}><FontAwesomeIcon icon={faUser} style={{marginRight: 5}}/> </p>
            <p className={'headerButtonText'} onClick={() => {clearTokens().then(() => nav('/login'))}} title={'Sign Out'}><FontAwesomeIcon icon={faSignOut} style={{marginRight: 5}}/> </p>
        </div>
    )
}

export default SideBar