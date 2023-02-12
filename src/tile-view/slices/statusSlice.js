import {createSlice} from '@reduxjs/toolkit';

const statusSlice = createSlice({
    name: 'gameStatus',
    initialState: {
        mapLoaded: false,
        characterLoaded: false,
        npcLoaded: [false, false],
        objectLoaded: [false,false,false,false],
        mode: 'game-won',
        winner: 'Jihoon',
        selectedOpponentIdx: 0,
        map: 'forest',
        backgroundImg: null,
        backgroundImgLoaded: false,
    },
    reducers: {
        loadMap(state, payload) {
            state.mapLoaded = payload;
        },
        loadCharacter(state, payload) {
            state.characterLoaded = payload;
        },
        loadNPC(state, action) {
            let tmp =[ ...state.objectLoaded]
            tmp[action.payload.idx] = action.payload.val
            state.npcLoaded =tmp
        },
        loadObject(state, action) {
            //debugger
            let tmp =[ ...state.objectLoaded]
            tmp[action.payload.idx] = action.payload.val
            state.objectLoaded =tmp
        },
        onGameEnd(state, action){
            state.mode = action.payload.mode;
            state.winner = action.payload.winner;
            state.selectedOpponentIdx = action.payload.selectedOpponentIdx;
        },
        changeMap(state, action){
            state.map = action.payload;
        },
        bufferBackgroundImage(state, action){
            state.backgroundImg = action.payload;
        },
        loadBackground(state, payload) {
            state.backgroundImgLoaded = payload;
        },
    }
});

export const { loadMap, loadCharacter, loadNPC, loadObject, onGameEnd, changeMap, bufferBackgroundImage, loadBackground } = statusSlice.actions;

export default statusSlice.reducer;