import React from "react"
import NoteTextInput from "../../notes/NoteTextInput";
import NoteEntry from "../../notes/NoteEntry";

function NoteView({useParentContext}){

    const {notes, postNote} = useParentContext();

    return (
        <div className={'mx-4 overflow-hidden'}>
            <NoteTextInput onSubmit={postNote}/>
            <div className={'flex w-full h-[2px] bg-gray-300 m-0'}/>
            <div className={'flex flex-col-reverse mt-10 overflow-auto'}>
                {
                    notes?.map((e, ind) => {
                        return <NoteEntry text={e.note} date={e.date} author={e.authorName} key={ind}/>
                    })
                }
            </div>
        </div>
    )
}

export default NoteView