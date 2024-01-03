import React from "react"
import NoteTextInput from "../../notes/NoteTextInput";
import NoteEntry from "../../notes/NoteEntry";

function LogView({useParentContext}){

    const {logs=[]} = useParentContext();

    return (
        <div className={'mx-4 overflow-hidden'}>
            <div className={'flex flex-col-reverse mt-10 overflow-auto'}>
                {
                    logs?.map((e, ind) => {
                        return <NoteEntry text={e.message} date={e.dateCreated} author={e.url} key={ind}/>
                    })
                }
            </div>
        </div>
    )
}

export default LogView