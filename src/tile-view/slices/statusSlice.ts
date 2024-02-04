import {createSlice, PayloadAction} from '@reduxjs/toolkit';
interface GameState {
    mapLoaded: boolean;
    characterLoaded: boolean;
    npcLoaded: [boolean, boolean];
    objectLoaded: [boolean, boolean, boolean, boolean];
    mode: string| undefined;
    winner: string| undefined;
    selectedOpponentIdx: number;
    map: string;
    backgroundImg: any
    backgroundImgLoaded: boolean;
}

export interface LoadNPCAction {
        idx: number;
        val: boolean;
}

export interface LoadObjectAction {
        idx: number;
        val: boolean;
}

export interface OnGameEndAction {
        mode: string|undefined;
        winner: string|undefined;
        selectedOpponentIdx: number;
}

const statusSlice = createSlice({
    name: 'gameStatus',
    initialState: {
        mapLoaded: false,
        characterLoaded: false,
        npcLoaded: [false, false],
        objectLoaded: [false, false, false, false],
        mode: 'start',
        winner: 'Jihoon',
        selectedOpponentIdx: 0,
        map: 'forest',
        backgroundImg: null,
        backgroundImgLoaded: false,
    } as GameState,
    reducers: {
        loadMap(state, action: PayloadAction<boolean>) {
            state.mapLoaded = action.payload;
        },
        loadCharacter(state, action: PayloadAction<boolean>) {
            state.characterLoaded = action.payload;
        },
        loadNPC(state, action: PayloadAction<LoadNPCAction>) {
            state.npcLoaded[action.payload.idx] = action.payload.val;
        },
        loadObject(state, action: PayloadAction<LoadObjectAction>) {
            state.objectLoaded[action.payload.idx] = action.payload.val;
        },
        onGameEnd(state, action: PayloadAction<OnGameEndAction>) {
            state.mode = action.payload.mode;
            state.winner = action.payload.winner;
            state.selectedOpponentIdx = action.payload.selectedOpponentIdx;
        },
        changeMap(state, action: PayloadAction<string>) {
            state.map = action.payload;
        },
        bufferBackgroundImage(state, action: PayloadAction<any>) {
            state.backgroundImg = action.payload;
        },
        loadBackground(state, action: PayloadAction<boolean>) {
            state.backgroundImgLoaded = action.payload ;
        },
    },
});

export const { loadMap, loadCharacter, loadNPC, loadObject, onGameEnd, changeMap, bufferBackgroundImage, loadBackground } = statusSlice.actions;

export default statusSlice.reducer;