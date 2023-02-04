import {createSlice} from '@reduxjs/toolkit';

const statusSlice = createSlice({
    name: 'status',
    initialState: {
        mapLoaded: false,
        characterLoaded: false,
        npcLoaded: [false, false],
        objectLoaded: [false,false,false,false],
        mode: 'world',
        winner: undefined
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
        },
    }
});

export const { loadMap, loadCharacter, loadNPC, loadObject, onGameEnd } = statusSlice.actions;

export default statusSlice.reducer;