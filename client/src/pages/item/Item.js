import React, {useEffect, useRef, useState} from "react"
import NoteView from "../../components/item/views/NoteView";
import {parseListAppendCustomer, parseListAppendProject} from "../../helpers/misc/miscHelpers";
import TableList from "../../components/tables/TableList";
import CreateTicketForm from "../../components/popup/Tickets/CreateTicketForm";
import TicketListContext from "../../contexts/TicketList/TicketListContext";
import ProjectDataClass from "../../classes/ProjectDataClass";
import {ProjectListContext} from "../../contexts/ProjectContext/ProjectListContext";
import AssetList from "../asset/AssetList";
import {AssetListContext} from "../../contexts/AssetContext/AssetListContext";
import {ContactContext} from "../../contexts/ContactContext/ContactContext";

function Item({useContext}){
    const {item, postNote, renderDetailView, listFilter} = useContext()
    const [pageName, setPageIndex] = useState('notes')

    const [showCreate, setShowCreate] = useState(false)
    function renderPageItem(){
        switch (pageName){
            case 'notes':
                return <NoteView notes={item.notes} postNoteFunction={postNote}/>
            case 'tickets':
                return <TicketListContext filter={item.objectID}/>
            case 'projects':
                return <ProjectListContext filter={item.objectID}/>
            case 'assets':
                return <AssetListContext filter={item.objectID}/>
            case 'contacts':
                return <ContactContext filter={item.objectID}/>
            default:
                return <h1>Invalid Page Type</h1>
        }
    }

    return (
        <>
            <div className={'w-full h-max p-2 bg-[#0c0c0c] flex justify-between items-baseline'}>
                <div className={'flex flex-row items-baseline justify-evenly gap-10'}>
                    <p className={'text-white text-3xl font-bold mr-10'}>{item.title}</p>
                    <p className={'font-bold hover:text-black text-gray-500 hover:cursor-pointer'} onClick={()=>{setPageIndex('notes')}}>Notes</p>
                    <p className={'font-bold hover:text-black text-gray-500 hover:cursor-pointer'} onClick={()=>{setPageIndex('tickets')}}>Tickets</p>
                    <p className={'font-bold hover:text-black text-gray-500 hover:cursor-pointer'} onClick={()=>{setPageIndex(('projects'))}}>Projects</p>
                    <p className={'font-bold hover:text-black text-gray-500 hover:cursor-pointer'} onClick={()=>{setPageIndex('assets')}}>Assets</p>
                    <p className={'font-bold hover:text-black text-gray-500 hover:cursor-pointer'} onClick={()=>{setPageIndex('contacts')}}>Contacts</p>
                </div>

                <p className={'text-white'}>{item.objectID}</p>
            </div>

            {renderPageItem()}
        </>
    )
}




// <div className={'flex flex-row'}>
//     <div className={`${sideBarCollapsed ? '-ml-[25vw]' : 'ml-0'} w-[25vw] transition-all`}>
//         <SideContent useContext={useContext}/>
//     </div>
//
//     {/*{(item.contacts || item.assets) && <SideContent useContext={useContext} />}*/}
//     <div className={'flex flex-col w-full'}>
//         <div className={'w-[40px] h-2 bg-gray-700 border-b-2 border-r-2 border-black flex justify-center items-center p-5 rounded-r hover:cursor-pointer'} onClick={()=>{setSideBarCollapsed(!sideBarCollapsed)}}>
//             <FontAwesomeIcon icon={sideBarCollapsed ? faAnglesRight : faAnglesLeft} color={'white'}/>
//         </div>
//         {/*<h2 className={'hover:cursor-pointer'}  onClick={()=>{setSideBarCollapsed(!sideBarCollapsed)}}>Side Panel</h2>*/}
//         <span className={'flex flex-row items-center gap-5 p-[40px]'}>
//                     {item?.color && <div style={{width: 20, height: 20, backgroundColor: item?.color || 'transparent', borderRadius: 20}}/>}
//             <h1 className={'text-black font-bold text-3xl'}>{item.title}</h1>
//                     <h4>ID &middot; {item.objectID}</h4>
//                 </span>
//         <div className={'px-[40px] bg-red-400'}>
//             {renderDetailView()}
//         </div>
//         <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', width: '100%', gap: 20}}>
//             {item.tickets && <TicketLinks tickets={item.tickets}/>}
//             {item.projects && <ProjectLinks projects={item.projects}/>}
//         </div>
//         <NoteView notes={item.notes} postNoteFunction={postNote}/>
//     </div>
// </div>

export default Item