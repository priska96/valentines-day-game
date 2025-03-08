import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export enum GameModeEnum {
    START = 'start',
    WORLD = 'world',
    BATTLE = 'battle',
    GET_OUT = 'get-out',
    NEW_CHAPTER = 'new-chapter',
    GAME_OVER = 'game-over',
    GAME_OVER_HOLE = 'game-over-hole',
    GAME_OVER_UNDERWATER = 'game-over-underwater',
    GAME_WON = 'game-won',
    VICTORY_EVIL_QUEEN = 'victory-evil-queen',
    SPELL_BROKEN = 'spell-broken',
    CHAPTER3 = 'chapter3',
    COLLECT_MERMAID_TEAR = 'collect-mermaid-tear',
    GO_TO_MERMAID_CITY = 'go-to-mermaid-city',
    WHIRLPOOL = 'whirlpool',
    VICTORY_SEA_MONSTERS = 'victory-sea-monsters',
    DELIVER_MERMAID_TEAR = 'deliver-mermaid-tear',
    RESTORE_BALANCE = 'restore-balance',
    EXPLOSION = 'explosion',
    BALANCE_RESTORED = 'balance-restored',
    GAME_WON_CHAPTER3_REWARD = 'game-won-chapter3-reward',
}

export const MELTED_PISCESTOWN_GAME_MODES = [
    GameModeEnum.VICTORY_EVIL_QUEEN,
    GameModeEnum.SPELL_BROKEN,
    GameModeEnum.CHAPTER3,
    GameModeEnum.COLLECT_MERMAID_TEAR,
    GameModeEnum.GO_TO_MERMAID_CITY,
    GameModeEnum.WHIRLPOOL,
    GameModeEnum.VICTORY_SEA_MONSTERS,
    GameModeEnum.DELIVER_MERMAID_TEAR,
    GameModeEnum.RESTORE_BALANCE,
    GameModeEnum.EXPLOSION,
    GameModeEnum.BALANCE_RESTORED,
    GameModeEnum.GAME_WON_CHAPTER3_REWARD,
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
    textureImg: (string | null)[];
    textureImgLoaded: boolean;
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

export interface LoadTextureAction {
    idx: number;
    val: boolean;
}

export interface BufferTextureImgAction {
    idx: number;
    textureImg: null | string;
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
        textureImg: [],
        textureImgLoaded: false,
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
        loadTexture(state, action: PayloadAction<boolean>) {
            state.textureImgLoaded = action.payload;
        },
        bufferTextureImage(
            state,
            action: PayloadAction<BufferTextureImgAction>
        ) {
            const { idx, textureImg } = action.payload;
            state.textureImg[idx] = textureImg;
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
    bufferTextureImage,
    loadTexture,
    updateStatusState,
} = statusSlice.actions;

export default statusSlice.reducer;
