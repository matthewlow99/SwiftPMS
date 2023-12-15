import React, {useState} from "react"

function ListCustomerAssets({assets, onSubmit, dismiss}){

    const [arr, setArr] = useState([])

    return (<>
        <div className={'modalBackground'}>
            <div className={'modalContainer'}>
                <h2 id={'closeButton'} onClick={() => {dismiss()}}>X</h2>
                <h1 style={{textAlign: 'center', margin: 0}}>Link Existing Asset</h1>

                <div>
                    <select style={{height: 130}} multiple onChange={({target}) => {setArr(Array.from(target.selectedOptions, option => option.value))}}>
                        {
                            assets.map((e, ind) => {
                                return <option value={e?._id}>
                                    {e.assetName} &middot; {e.assetTagID}
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

export default ListCustomerAssets