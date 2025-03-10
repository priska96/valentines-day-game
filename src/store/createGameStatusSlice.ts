import { StateCreator } from 'zustand';
import { GameModeEnum } from './enums';
import { GameStatusSlice, RootStore } from './types';

export const createGameStatusSlice: StateCreator<
    RootStore,
    [['zustand/devtools', never]],
    [],
    GameStatusSlice
> = (set) => ({
    gameStatus: {
        mapLoaded: false,
        characterLoaded: false,
        npcLoaded: new Array(33).fill(false) as boolean[],
        objectLoaded: new Array(7).fill(false) as boolean[],
        autotileLoaded: [false],
        mode: GameModeEnum.START,
        winner: 'Jihoon',
        selectedOpponentIdx: 0,
        map: 'forest',
        backgroundImg: [],
        backgroundImgLoaded: false,
        textureImg: [],
        textureImgLoaded: false,
    },

    loadMap: (val) =>
        set(
            (state) => ({
                ...state,
                gameStatus: { ...state.gameStatus, mapLoaded: val },
            }),
            undefined,
            'root:gameStatus/loadMap'
        ),

    loadCharacter: (val) =>
        set(
            (state) => ({
                ...state,
                gameStatus: { ...state.gameStatus, characterLoaded: val },
            }),
            undefined,
            'root:gameStatus/loadCharacter'
        ),

    loadNPC: ({ idx, val }) =>
        set(
            (state) => {
                const newNpcLoaded = [...state.gameStatus.npcLoaded];
                newNpcLoaded[idx] = val;
                return {
                    ...state,
                    gameStatus: {
                        ...state.gameStatus,
                        npcLoaded: newNpcLoaded,
                    },
                };
            },
            undefined,
            'root:gameStatus/loadNPC'
        ),

    loadObject: ({ idx, val }) =>
        set(
            (state) => {
                const newObjectLoaded = [...state.gameStatus.objectLoaded];
                newObjectLoaded[idx] = val;
                return {
                    ...state,
                    gameStatus: {
                        ...state.gameStatus,
                        objectLoaded: newObjectLoaded,
                    },
                };
            },
            undefined,
            'root:gameStatus/loadObject'
        ),

    loadAutotile: ({ idx, val }) =>
        set(
            (state) => {
                const newAutotileLoaded = [...state.gameStatus.autotileLoaded];
                newAutotileLoaded[idx] = val;
                return {
                    ...state,
                    gameStatus: {
                        ...state.gameStatus,
                        autotileLoaded: newAutotileLoaded,
                    },
                };
            },
            undefined,
            'root:gameStatus/loadAutotile'
        ),

    onGameEnd: ({ mode, winner, selectedOpponentIdx }) =>
        set(
            (state) => ({
                ...state,
                gameStatus: {
                    ...state.gameStatus,
                    mode,
                    winner: winner ?? undefined,
                    selectedOpponentIdx,
                },
            }),
            undefined,
            'root:gameStatus/onGameEnd'
        ),

    changeMap: (map) =>
        set(
            (state) => ({ ...state, gameStatus: { ...state.gameStatus, map } }),
            undefined,
            'root:gameStatus/changeMap'
        ),

    bufferBackgroundImage: ({ idx, backgroundImg }) =>
        set(
            (state) => {
                const newBackgroundImg = [...state.gameStatus.backgroundImg];
                newBackgroundImg[idx] = backgroundImg;
                return {
                    ...state,
                    gameStatus: {
                        ...state.gameStatus,
                        backgroundImg: newBackgroundImg,
                    },
                };
            },
            undefined,
            'root:gameStatus/bufferBackgroundImage'
        ),

    loadBackground: (val) =>
        set(
            (state) => ({
                ...state,
                gameStatus: { ...state.gameStatus, backgroundImgLoaded: val },
            }),
            undefined,
            'root:gameStatus/loadBackground'
        ),

    bufferTextureImage: ({ idx, textureImg }) =>
        set(
            (state) => {
                const newTextureImg = [...state.gameStatus.textureImg];
                newTextureImg[idx] = textureImg;
                return {
                    ...state,
                    gameStatus: {
                        ...state.gameStatus,
                        textureImg: newTextureImg,
                    },
                };
            },
            undefined,
            'root:gameStatus/bufferTextureImage'
        ),

    loadTexture: (val) =>
        set(
            (state) => ({
                ...state,
                gameStatus: { ...state.gameStatus, textureImgLoaded: val },
            }),
            undefined,
            'root:gameStatus/loadTexture'
        ),

    updateStatusState: (newState) =>
        set(
            (state) => ({ ...state, gameStatus: newState }),
            undefined,
            'root:gameStatus/updateStatusState'
        ),
});
