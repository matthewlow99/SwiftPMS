import React, {useEffect, useState} from "react"
import NoteView from "../../components/item/views/NoteView";
import SideContent from "../../components/item/detail/SideContent";
import TicketLinks from "../../components/item/detail/TicketLinks";
import ProjectLinks from "../../components/item/detail/ProjectLinks";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faDesktop} from "@fortawesome/free-solid-svg-icons";
import {faAnglesRight} from "@fortawesome/free-solid-svg-icons/faAnglesRight";
import {faAnglesLeft} from "@fortawesome/free-solid-svg-icons/faAnglesLeft";

function Item({useContext}){
    const {item, postNote, renderDetailView} = useContext()
    const [sideBarCollapsed, setSideBarCollapsed] = useState(true)

    useEffect(() => {
        console.log(sideBarCollapsed)
    }, [sideBarCollapsed]);

    return (
        <div className={'flex flex-row'}>
            <div className={`${sideBarCollapsed ? '-ml-[25vw]' : 'ml-0'} w-[25vw] transition-all`}>
                <SideContent useContext={useContext}/>
            </div>

            {/*{(item.contacts || item.assets) && <SideContent useContext={useContext} />}*/}
            <div className={'flex flex-col w-full'}>
                <div className={'w-[40px] h-2 bg-gray-700 border-b-2 border-r-2 border-black flex justify-center items-center p-5 rounded-r hover:cursor-pointer'} onClick={()=>{setSideBarCollapsed(!sideBarCollapsed)}}>
                    <FontAwesomeIcon icon={sideBarCollapsed ? faAnglesRight : faAnglesLeft} color={'white'}/>
                </div>
                {/*<h2 className={'hover:cursor-pointer'}  onClick={()=>{setSideBarCollapsed(!sideBarCollapsed)}}>Side Panel</h2>*/}
                <span className={'flex flex-row items-center gap-5 p-[40px]'}>
                    {item?.color && <div style={{width: 20, height: 20, backgroundColor: item?.color || 'transparent', borderRadius: 20}}/>}
                    <h1 className={'text-black font-bold text-3xl'}>{item.title}</h1>
                    <h4>ID &middot; {item.objectID}</h4>
                </span>
                <div className={'px-[40px] bg-red-400'}>
                    {renderDetailView()}
                </div>
                <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', width: '100%', gap: 20}}>
                    {item.tickets && <TicketLinks tickets={item.tickets}/>}
                    {item.projects && <ProjectLinks projects={item.projects}/>}
                </div>
                <NoteView notes={item.notes} postNoteFunction={postNote}/>
            </div>
        </div>
    )
}

export default Item