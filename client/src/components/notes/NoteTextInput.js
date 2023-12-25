import React, {useState} from "react"

function NoteTextInput({onSubmit}){

    const [note, setNote] = useState("")

    return (
        <>
            <textarea onInput={(e) => {
                e.target.style.height = "";
                e.target.style.height = e.target.scrollHeight + "px"
            }} placeholder={'Add note to ticket'} value={note} onChange={({target})=>{setNote(target.value)}} className={'bg-gray-50 w-[50%] mx-auto'} inputMode={'text'} aria-multiline={"true"}/>
            <p className={'mx-auto bg-blue-500 w-fit px-3 py-1 border-black border-[1px] rounded shadow font-bold hover:bg-blue-600 hover:cursor-pointer transition-all text-white'} onClick={()=>{onSubmit(note).then(()=>{setNote("")})}}>Post Note</p>
        </>
    )
}

export default NoteTextInput