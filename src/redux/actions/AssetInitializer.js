import {actions} from '../constants/AssetInitializer'

export const initAssetList=(assetList)=>async(dispatch)=>{
    try{

        console.log(assetList)

        dispatch({
            type: actions.INIT_ASSET_LIST,
            payload: assetList
        })
    }catch(err){
        console.log(err)
    }
}