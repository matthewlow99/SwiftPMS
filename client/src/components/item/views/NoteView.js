import React from "react"
import NoteTextInput from "../../notes/NoteTextInput";
import NoteEntry from "../../notes/NoteEntry";

function NoteView({notes, postNoteFunction}){
    return (
        <div className={'notePageContainer'}>
            <h3>Notes:</h3>
            <NoteTextInput onSubmit={postNoteFunction}/>
            <div style={{display:'flex', flexDirection: 'column-reverse'}}>
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