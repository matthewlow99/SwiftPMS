import React from "react"
import {Route, Routes} from "react-router-dom";
import TicketList from "../ticket/TicketList";
import Ticket from "../ticket/Ticket";
import {BrowserRouter} from "react-router-dom";
import ContactList from "../contact/ContactList";
import Contact from "../contact/Contact";
import AssetList from "../asset/AssetList";
import Asset from "../asset/Asset";
import TicketListContext from "../../contexts/TicketList/TicketListContext";
import {TicketDataContext} from "../../contexts/TicketData/TicketDataContext";
import CustomerList from "../customer/CustomerList";
import {CustomerListContext} from "../../contexts/CustomerList/CustomerListContext";
import {AssetListContext} from "../../contexts/AssetContext/AssetListContext";
import ProjectList from "../project/ProjectList";
import {ProjectListContext} from "../../contexts/ProjectContext/ProjectListContext";
import {ContactContext} from "../../contexts/ContactContext/ContactContext";
import {CustomerDataContext, useCustomerDataContext} from "../../contexts/CustomerList/CustomerDataContext";
import Item from "../item/Item";
import {AssetDataContext} from "../../contexts/AssetContext/AssetDataContext";
import {ProjectDataContext} from "../../contexts/ProjectContext/ProjectDataContext";
import {ContactDataContext} from "../../contexts/ContactContext/ContactDataContext";
import Login from "../Login/Login";
import {SessionContext} from "../../contexts/_SessionContexts/SessionContext";
import AuthHandler from "../AuthHandler/AuthHandler";

function CustomRoutes(){

    return (<>
            <Routes>
                <Route path={'/'} element={<AuthHandler />}/>
                <Route path={'/login'} element={<Login menuIndex={0}/>} />
                <Route path={'/create'} element={<Login menuIndex={1}/>} />
                <Route path={'/tickets'} element={<TicketListContext><TicketList text={'first page'}/></TicketListContext>}/>
                <Route path={'/ticket/:ticketID'} element={<TicketDataContext><Ticket /></TicketDataContext>}/>
                <Route path={'/contacts'} element={<ContactContext><ContactList /></ContactContext>}/>
                <Route path={'/contact/:contactID'} element={<ContactDataContext />}/>
                <Route path={'/customers'} element={<CustomerListContext><CustomerList /></CustomerListContext>}/>
                <Route path={'/customer/:customerID'} element={<CustomerDataContext />}/>
                <Route path={'/assets'} element={<AssetListContext><AssetList /></AssetListContext>}/>
                <Route path={'/asset/:assetID'} element={<AssetDataContext />}/>
                <Route path={'/projects'} element={<ProjectListContext><ProjectList /></ProjectListContext>} />
                <Route path={'/project/:projectID'} element={<ProjectDataContext />} />
            </Routes>
    </>)
}

export default CustomRoutes