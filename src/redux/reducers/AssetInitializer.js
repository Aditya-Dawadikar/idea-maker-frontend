import { actions } from "../constants/AssetInitializer";

export const AssetInitializerReducer=(state={},action)=>{
    switch(action.type){
        case actions.INIT_ASSET_LIST:
            return {
                assetList : action.payload
            }
        default:
            return state
    }
}