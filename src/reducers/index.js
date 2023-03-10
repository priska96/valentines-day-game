import {combineReducers} from 'redux';
import characterReducer from '../tile-view/slices/characterSlice';
import npcReducer from '../tile-view/slices/npcSlice';
import objectReducer from '../tile-view/slices/objectSlice';
import mapImagesReducer from '../tile-view/slices/mapImagesSlice';
import statusReducer from '../tile-view/slices/statusSlice';
import dialogReducer from '../game-ui/slices/dialogSlice'

export default combineReducers({
    mapImagesLoaded: mapImagesReducer,
    gameStatus: statusReducer,
    character: characterReducer,
    npc: npcReducer,
    objectNPC: objectReducer,
    dialog: dialogReducer
});
