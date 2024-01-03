import {createContext, useContext, useEffect, useState} from "react";
import NoteView from "../../components/item/views/NoteView";
import {apiRequest} from "../../helpers/api/apiFunctionHelpers";

const _NoteContext = createContext()

export function useNoteContext(){
    return useContext(_NoteContext)
}
export function NoteContext({useParentContext}){

    const {notes} = useParentContext();



    return <_NoteContext.Provider value={{notes}}>
        <NoteView notes={notes} postNoteFunction={()=>{}}/>
    </_NoteContext.Provider>
}