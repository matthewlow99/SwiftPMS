import React from "react"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faBuilding, faBuildingUser,
    faDesktop,
    faFolder,
    faGear, faList,
    faListDots, faPencil, faServer, faSignOut,
    faTicket,
    faUser,
    faUsers
} from "@fortawesome/free-solid-svg-icons";
import {useLocation, useNavigate, useParams, useRoutes} from "react-router-dom";
import {useSessionContext} from "../../contexts/_SessionContexts/SessionContext";
import {faBell} from "@fortawesome/free-solid-svg-icons/faBell";
import {faGears} from "@fortawesome/free-solid-svg-icons/faGears";

function SideBar(){

    const nav = useNavigate()
    const {pathname} = useLocation();
    console.log(pathname)
    const {clearTokens} = useSessionContext();

    function getBackgroundColor(path){
        if(pathname === path)
            return 'bg-gray-700 text-white';
    }

    return (
        <div className={'w-fit z-10 bg-[#0c0c0c] h-screen group/sidebar'}>
            <div className={'side-menu-item py-5 px-3'}>
                <img src={require('../../assets/bare_logo.png')} className={'max-w-[100%] animate-spin'}/>
            </div>

            <p className={`side-menu-item ${getBackgroundColor('/customers')}`} onClick={() => {nav('/customers')}} title={'Customers'}><FontAwesomeIcon icon={faBuilding} style={{marginRight: 5}}/> </p>
            <p className={`side-menu-item ${getBackgroundColor('/tickets')}`} onClick={() => {nav('/tickets')}} title={'Tickets'}><FontAwesomeIcon icon={faTicket} style={{marginRight: 5}}/> </p>
            <p className={`side-menu-item ${getBackgroundColor('/projects')}`} onClick={() => {nav('/projects')}} title={'Projects'}><FontAwesomeIcon icon={faFolder} style={{marginRight: 5}}/> </p>
            <p className={`side-menu-item ${getBackgroundColor('/endpoints')}`} onClick={() => {nav('/endpoints')}} title={'Endpoint Logging'}><FontAwesomeIcon icon={faServer} style={{marginRight: 5}}/></p>
            <p className={'side-menu-item'} onClick={() => {clearTokens().then(() => nav('/login'))}} title={'Sign Out'}><FontAwesomeIcon icon={faSignOut} style={{marginRight: 5}}/> </p>
        </div>
    )
}

export default SideBar