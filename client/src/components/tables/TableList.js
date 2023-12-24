import React, {createElement, useState} from "react"
import ListEntryText from "../item/_entryComponents/ListEntryText";
import {faBuilding} from "@fortawesome/free-solid-svg-icons";
import {useNavigate} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import FullscreenModal from "../popup/FullscreenModal";


/**
 *
 *
 * @param keyMap - An array of key value pairs in the format {header:objectKey, header:objectKey, ...etc}
 * @param navPrefix - Related to object type; Will be used to navigate to customer/_id for example.
 * @param toggleShowEditRow
 * @returns {Element}
 * @constructor
 */
function TableList({keyMap={}, list=[], navPrefix='/', prependedIcon, createForm=()=>{<></>}}){

    const [showCreate, setShowCreate] = useState(false)
    const mapLength = Object.keys(keyMap).length;
    const listLength = list.length;
    const nav = useNavigate();

    return (<>
        <div  className={'list-view-container'}>
            <table className={'w-full pt-5'}>
                <thead className={'bg-[#0c0c0c]'}>
                <tr className={'text-white '}>
                    {
                        Object.keys(keyMap).map((e, ind) => {
                            return <th className={`w-1/${mapLength}`}>{e}</th>
                        })
                    }
                </tr>
                </thead>
                <tbody>
                {
                    list.map((e, ind) => {
                        return <>
                            <tr className={'list-row'} key={ind} onClick={()=>{nav(`/${navPrefix}/${e._id}`)}}>
                                {
                                    Object.values(keyMap).map((v, ind) => {
                                        console.log(e.color.toLowerCase())
                                        return <td className={'custom-table-cell w-1/4'} key={ind}>
                                            <div className={'flex flex-row items-center gap-3'}>
                                                {ind === 0 && <div className={`w-[13px] h-[13px] rounded rounded-3xl border border-[1px] border-gray-600`} style={{backgroundColor: e.color}}/>}
                                                {e[v]}
                                            </div>
                                        </td>
                                    })
                                }
                            </tr>
                        </>
                    })
                }
                </tbody>
            </table>
            <div className={'flex flex-row justify-left m-3'}>
                <button className={'bg-blue-500 w-fit px-3 py-1 border-black border-[1px] rounded shadow font-bold hover:bg-blue-600 hover:cursor-pointer transition-all text-white'} style={{borderRadius: 10}} onClick={() => {setShowCreate(prev => !prev)}}>New</button>
                <button className={'list-button'} style={{borderRadius: 10}}>Show Closed</button>
            </div>
        </div>
        <FullscreenModal visible={showCreate} formElement={createForm(() => setShowCreate(false))} />
    </>)
}

export default TableList