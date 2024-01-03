import React from "react"
import '../../css/note.css'

function NoteEntry({text, author="System", date}){
    return (
        <div className={'w-fill bg-[#efefef] h-fit mb-10 p-3 border border-y-0 border-r-0 border-l-8 border-[#60a5fa] shadow rounded'}>
            <p className={'font-bold text-lg mb-1'}>{author}</p>
            <h5>{text}</h5>
            <p className={'text-sm mt-4 text-gray-400'}>{date}</p>
        </div>
    )
}

export default NoteEntry