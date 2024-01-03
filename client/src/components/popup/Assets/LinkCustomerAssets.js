import React, {useState} from "react"

function LinkCustomerAssets({assets, onSubmit, dismiss}){

    const [arr, setArr] = useState([])

    return (<>
        <div className={'modalBackground'}>
            <div className={'flex flex-col items-left bg-gray-400 p-10 gap-5 w-[20%] rounded border-black border-[1px] shadow'}>
                <h1 className={'font-bold'}>Link Existing Asset</h1>
                <div>
                    <select className={'w-full border border-black shadow p-2'} multiple onChange={({target}) => {setArr(Array.from(target.selectedOptions, option => option.value))}}>
                        {
                            assets.map((e, ind) => {
                                return <option value={e?._id}>
                                    {e.assetName} &middot; {e.assetTagID}
                                </option>
                            })
                        }
                    </select>
                </div>

                <div className={'flex flex-row gap-2'}>
                    <h2 className={'bg-blue-500 w-fit px-3 py-1 border-black border-[1px] rounded shadow font-bold hover:bg-blue-600 hover:cursor-pointer transition-all text-white'} onClick={() => onSubmit(arr).then(dismiss)}>Submit</h2>
                    <h2 className={'bg-gray-500 w-fit px-3 py-1 border-black border-[1px] rounded shadow font-bold hover:bg-gray-600 hover:cursor-pointer transition-all text-white'} onClick={dismiss}>Cancel</h2>
                </div>

            </div>
        </div>
    </>)
}

export default LinkCustomerAssets