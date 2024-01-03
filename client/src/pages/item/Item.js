import React, {useEffect, useRef, useState} from "react"
import NoteView from "../../components/item/views/NoteView";
import TicketListContext from "../../contexts/TableContexts/TicketListContext";
import {ProjectListContext} from "../../contexts/TableContexts/ProjectListContext";
import {ContactContext} from "../../contexts/TableContexts/ContactContext";
import AssetList from "../../pages/ListViews/AssetList"
import {AssetListContext} from "../../contexts/TableContexts/AssetListContext";
import {NoteContext} from "../../contexts/TableContexts/NoteContext";
import TicketList from "../ListViews/TicketList";
import ProjectList from "../ListViews/ProjectList";
import ContactList from "../ListViews/ContactList";
import EndpointList from "../ListViews/EndpointList";
import LogView from "../../components/item/views/LogView";



function Item({tabIndexes, title, color, id, useParentContext}){
    const [pageName, setPageIndex] = useState(tabIndexes[0])

    function renderPageItem(){
        switch (pageName){
            case 'notes':
                return <NoteView useParentContext={useParentContext}/>
            case 'logs':
                return <LogView useParentContext={useParentContext}/>
            case 'tickets':
                return <TicketList useParentContext={useParentContext}/>
            case 'projects':
                return <ProjectList useParentContext={useParentContext}/>
            case 'contacts':
                return <ContactList useParentContext={useParentContext}/>
            case 'assets':
                return <AssetList useParentContext={useParentContext}/>
            case 'endpoints':
                return <EndpointList useParentContext={useParentContext}/>
            default:
                return <h1>Invalid Page Type {`'${pageName}'`}</h1>
        }
    }

    const HeaderButton = ({indexName}) => {
        let labelText = indexName.charAt(0).toUpperCase() + indexName.slice(1);
        return <p className={`font-bold hover:text-black ${indexName === pageName ? 'text-white' : 'text-gray-500'} hover:cursor-pointer`} onClick={()=>{setPageIndex(indexName)}}>{labelText}</p>
    }

    return (
        <>
            <div className={'w-full h-max p-2 bg-[#0c0c0c] flex justify-between items-baseline'}>
                <div className={'flex flex-row items-baseline justify-evenly gap-10'}>
                    <p className={'text-white text-3xl font-bold mr-10'}>{title}</p>
                    {
                        tabIndexes.map((e, ind) => {
                            return <HeaderButton indexName={e} key={ind}/>
                        })
                    }
                </div>

                <p className={'text-white'}>{id}</p>
            </div>

            {renderPageItem()}
        </>
    )
}


export default Item