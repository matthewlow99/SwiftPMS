import React from "react"

function ItemHeader({pageTitle, tabArray, }){
    const HeaderButton = ({indexName}) => {
        let labelText = indexName.charAt(0).toUpperCase() + indexName.slice(1);

        return <p className={`font-bold hover:text-black ${indexName === pageName ? 'text-white' : 'text-gray-500'} hover:cursor-pointer`} onClick={()=>{setPageIndex(indexName)}}>{labelText}</p>
    }

    return (<>

    </>)
}



export default ItemHeader