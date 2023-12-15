import React, {useState} from "react"

function LinkCustomerContacts({contacts, onSubmit,  dismiss}){
    const [arr, setArr] = useState([])



    return (<>
        <div className={'modalBackground'}>
            <div className={'modalContainer'}>
                <h2 id={'closeButton'} onClick={() => {dismiss()}}>X</h2>
                <h1 style={{textAlign: 'center', margin: 0}}>Link Existing Contacts</h1>

                <div>
                    <select style={{height: 130}} multiple onChange={({target}) => {setArr(Array.from(target.selectedOptions, option => option.value))}}>
                        {
                            contacts.map((e, ind) => {
                                return <option value={e?._id} key={ind}>
                                    {e.name}
                                </option>
                            })
                        }
                    </select>
                </div>

                <div id={'buttonRow'}>
                    <h2 style={{textAlign: 'center'}} onClick={()=>{onSubmit(arr).then(dismiss)}}>Create</h2>
                </div>

            </div>
        </div>
    </>)
}

export default LinkCustomerContacts