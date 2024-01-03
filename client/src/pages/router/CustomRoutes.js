import React from "react"
import {Route, Routes} from "react-router-dom";
import TicketList from "../ListViews/TicketList"
import Ticket from "../ticket/Ticket";
import {BrowserRouter} from "react-router-dom";
import ContactList from "../contact/ContactList";
import Contact from "../contact/Contact";
import AssetList from "../asset/AssetList";
import Asset from "../asset/Asset";
import TicketListContext from "../../contexts/TableContexts/TicketListContext";
import {TicketDataContext} from "../../contexts/ParentContexts/TicketDataContext";
import CustomerList from "../ListViews/CustomerList"
import {CustomerListContext} from "../../contexts/TableContexts/CustomerListContext";
import {AssetListContext} from "../../contexts/TableContexts/AssetListContext";
import ProjectList from "../ListViews/ProjectList"
import {ProjectListContext} from "../../contexts/TableContexts/ProjectListContext";
import {ContactContext} from "../../contexts/TableContexts/ContactContext";
import {CustomerDataContext, useCustomerDataContext} from "../../contexts/ParentContexts/CustomerDataContext";
import Item from "../item/Item";
import {AssetDataContext} from "../../contexts/ParentContexts/AssetDataContext";
import {ProjectDataContext} from "../../contexts/ParentContexts/ProjectDataContext";
import {ContactDataContext} from "../../contexts/ParentContexts/ContactDataContext";
import Login from "../Login/Login";
import {SessionContext} from "../../contexts/_SessionContexts/SessionContext";
import AuthHandler from "../AuthHandler/AuthHandler";
import {GlobalDataContext, useGlobalDataContext} from "../../contexts/_SessionContexts/GlobalDataContext";
import {EndpointDataContext} from "../../contexts/ParentContexts/EndpointDataContext";

function CustomRoutes(){

    return (<>
        <GlobalDataContext>
            <Routes>
                <Route path={'/'} element={<AuthHandler />}/>
                <Route path={'/login'} element={<Login menuIndex={0}/>} />
                <Route path={'/create'} element={<Login menuIndex={1}/>} />
                <Route path={'/tickets'} element={<TicketList useParentContext={useGlobalDataContext}/>} />
                <Route path={'/ticket/:ticketID'} element={<TicketDataContext><Ticket /></TicketDataContext>}/>
                <Route path={'/contact/:contactID'} element={<ContactDataContext />}/>
                <Route path={'/customers'} element={<CustomerList useParentContext={useGlobalDataContext}/>}/>
                <Route path={'/customer/:customerID'} element={<CustomerDataContext />}/>
                <Route path={'/asset/:assetID'} element={<AssetDataContext />}/>
                <Route path={'/projects'} element={<ProjectList useParentContext={useGlobalDataContext}/>} />
                <Route path={'/project/:projectID'} element={<ProjectDataContext />} />
                <Route path={'/endpoint/:endpointID'} element={<EndpointDataContext />}/>
            </Routes>
        </GlobalDataContext>
    </>)
}

export default CustomRoutes