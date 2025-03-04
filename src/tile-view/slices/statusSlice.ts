import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export enum GameModeEnum {
    START = 'start',
    WORLD = 'world',
    BATTLE = 'battle',
    GET_OUT = 'get-out',
    NEW_CHAPTER = 'new-chapter',
    GAME_OVER = 'game-over',
    GAME_OVER_HOLE = 'game-over-hole',
    GAME_WON = 'game-won',
    VICTORY_EVIL_QUEEN = 'victory-evil-queen',
    SPELL_BROKEN = 'spell-broken',
    CHAPTER3 = 'chapter3',
    COLLECT_MERMAID_TEAR = 'collect-mermaid-tear',
    GO_TO_MERMAID_CITY = 'go-to-mermaid-city',
    WHIRLPOOL = 'whirlpool',
}

export const MELTED_PISCESTOWN_GAME_MODES = [
    GameModeEnum.VICTORY_EVIL_QUEEN,
    GameModeEnum.SPELL_BROKEN,
    GameModeEnum.CHAPTER3,
    GameModeEnum.COLLECT_MERMAID_TEAR,
    GameModeEnum.GO_TO_MERMAID_CITY,
];
interface GameState {
    mapLoaded: boolean;
    characterLoaded: boolean;
    npcLoaded: boolean[];
    objectLoaded: boolean[];
    autotileLoaded: boolean[];
    mode: GameModeEnum | undefined;
    winner: string | undefined;
    selectedOpponentIdx: number;
    map: string;
    backgroundImg: (string | null)[];
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

export interface LoadAutotileAction {
    idx: number;
    val: boolean;
}

export interface LoadBackgroundAction {
    idx: number;
    val: boolean;
}

export interface BufferBackgroundImgAction {
    idx: number;
    backgroundImg: null | string;
}

export interface OnGameEndAction {
    mode: GameModeEnum | undefined;
    winner: string | undefined;
    selectedOpponentIdx: number;
}

const statusSlice = createSlice({
    name: 'gameStatus',
    initialState: {
        mapLoaded: false,
        characterLoaded: false,
        npcLoaded: [
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
        ],
        objectLoaded: [false, false, false, false, false, false, false],
        autotileLoaded: [false],
        mode: GameModeEnum.START,
        winner: 'Jihoon',
        selectedOpponentIdx: 0,
        map: 'forest',
        backgroundImg: [],
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
        loadAutotile(state, action: PayloadAction<LoadAutotileAction>) {
            console.log('loadAutotile', state.autotileLoaded);
            state.autotileLoaded[action.payload.idx] = action.payload.val;
        },
        onGameEnd(state, action: PayloadAction<OnGameEndAction>) {
            state.mode = action.payload.mode;
            state.winner = action.payload.winner;
            state.selectedOpponentIdx = action.payload.selectedOpponentIdx;
        },
        changeMap(state, action: PayloadAction<string>) {
            state.map = action.payload;
        },
        bufferBackgroundImage(
            state,
            action: PayloadAction<BufferBackgroundImgAction>
        ) {
            const { idx, backgroundImg } = action.payload;
            state.backgroundImg[idx] = backgroundImg;
        },
        loadBackground(state, action: PayloadAction<boolean>) {
            state.backgroundImgLoaded = action.payload;
        },
        updateStatusState(_, action: PayloadAction<GameState>) {
            return action.payload;
        },
    },
});

export const {
    loadMap,
    loadCharacter,
    loadNPC,
    loadAutotile,
    loadObject,
    onGameEnd,
    changeMap,
    bufferBackgroundImage,
    loadBackground,
    updateStatusState,
} = statusSlice.actions;

export default statusSlice.reducer;
