import React, {useState} from "react"
import ContactPageGridEntry from "../../components/item/contact/ContactPageGridEntry";
import AssetPageListEntry from "../../components/item/asset/AssetPageListEntry";
import {useNavigate} from "react-router-dom";
import CreateAssetForm from "../../components/popup/Assets/CreateAssetForm";
import FullscreenModal from "../../components/popup/FullscreenModal";
import {useAssetListContext} from "../../contexts/AssetContext/AssetListContext";

function AssetList(){

    const [showCreate, setShowCreate] = useState(false)

    const {assets} = useAssetListContext();

    return (
        <>
            <div className={'contactPageGridContainer'} >
                <div className={'flexRowAlignCenter'} style={{justifyContent: 'space-between', width: '100%', marginTop: 20, marginBottom: 20}}>
                    <p className={'listPageButton'} onClick={() => {setShowCreate(true)}}>+ New Asset</p>
                    <p>View Closed Tickets</p>
                </div>

                {
                    assets.map((e, ind) => {
                        return <AssetPageListEntry asset={e} key={ind}/>
                    })
                }
            </div>
            <FullscreenModal visible={showCreate} formElement={<CreateAssetForm dismiss={() => {setShowCreate(false)}}/>}/>
        </>
    )
}

export default AssetList