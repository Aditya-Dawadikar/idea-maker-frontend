import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import logger from "redux-logger";

import { AssetInitializerReducer } from './reducers/AssetInitializer';

const reducer = combineReducers({
    assetList: AssetInitializerReducer
})

let list=[{
    asset_id: "asset_1",
    asset_name: "Stupid Image",
    asset_type: "image",
    asset_src: "https://atomhawk.com/wp-content/uploads/2022/05/Atomhawk_Concept-Art_Character-Art_Canopy-Character-Exploration-01_2-1-1200x600.jpg",
    pos: {
        x: parseInt((Math.random() * 1000) % window.innerWidth),
        y: parseInt((Math.random() * 1000) % window.innerHeight)
    },
    links: ["asset_2", "asset_3"]
}
, {
    asset_id: "asset_2",
    asset_name: "Stupid Video",
    asset_type: "video",
    asset_src: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    pos: {
        x: parseInt((Math.random() * 1000) % window.innerWidth),
        y: parseInt((Math.random() * 1000) % window.innerHeight)
    },
    links: ["asset_3"]
}, {
    asset_id: "asset_3",
    asset_name: "Stupid Text",
    asset_type: "text",
    asset_src: "",
    asset_text: "act 3 will be grand",
    pos: {
        x: parseInt((Math.random() * 1000) % window.innerWidth),
        y: parseInt((Math.random() * 1000) % window.innerHeight)
    },
    links: []
}]

const initialState = {
    assetList: {
        assetList: list
    }
}

const middleware = [thunk, logger]

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
)

export default store