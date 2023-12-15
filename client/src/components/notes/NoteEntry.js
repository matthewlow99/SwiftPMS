import React from "react"
import '../../css/note.css'

function NoteEntry({text, author="System", date}){
    return (
        <div className={'noteContainer'}>
            <h5>{text}</h5>
            <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginTop: 20, marginBottom: 20}}>
                <p>{author}</p>
                <p>{date}</p>
            </div>
        </div>
    )
}

export default NoteEntry