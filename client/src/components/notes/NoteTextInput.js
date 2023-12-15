import React, {useState} from "react"

function NoteTextInput({onSubmit}){

    const [note, setNote] = useState("")

    return (
        <>
            <textarea onInput={(e) => {
                e.target.style.height = "";
                e.target.style.height = e.target.scrollHeight + "px"
            }} placeholder={'Add note to ticket'} style={{minHeight: 80}} value={note} onChange={({target})=>{setNote(target.value)}} className={'noteTextInputField'} inputMode={'text'} aria-multiline={"true"}/>
            <p className={'postNoteButton'} onClick={()=>{onSubmit(note).then(()=>{setNote("")})}}>Post Note</p>
        </>
    )
}

export default NoteTextInput