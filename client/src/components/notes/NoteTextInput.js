import React, {useState} from "react"

function NoteTextInput({onSubmit}){

    const [note, setNote] = useState("")

    return (
        <>
            <div className={'flex flex-row w-full border border-black rounded shadow my-10'}>
              <textarea onInput={(e) => {
                  e.target.style.height = "";
                  e.target.style.height = e.target.scrollHeight + "px"
              }} placeholder={'Type note'} value={note} onChange={({target})=>{setNote(target.value)}} className={'bg-gray-50 mx-auto flex-1'} inputMode={'text'} aria-multiline={"true"}/>
                <p className={'mx-auto bg-blue-500 w-fit px-3 rounded shadow font-bold hover:bg-blue-600 hover:cursor-pointer transition-all text-white align-text rounded-l-none flex items-center'} onClick={()=>{onSubmit(note).then(()=>{setNote("")})}}>Post</p>
            </div>

        </>
    )
}

export default NoteTextInput