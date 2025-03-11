import { StateCreator } from 'zustand';
import {
    CharacterSlice,
    CharacterState,
    directions,
    KeyDirections,
    RootStore,
} from './types';
import JihoonFight from '../images/heroes/jihoon_fight.png';
import JihoonPortrait from '../images/heroes/jihoon_portrait.png';

const initialState: CharacterState = {
    x: 8,
    y: 14,
    step: 0,
    dir: 0,
    heroClass: 'SWORDSMAN',
    heroImg: null,
    type: 'hero',
    playerSummary: {
        level: 0,
        health: 20,
        maxHealth: 177,
        name: 'Jihoon',
        img: JihoonFight,
        magic: 32,
        attack: 75,
        defense: 30,
        magicDefense: 30,
    },
    portrait: JihoonPortrait,
    inventory: [],
    animate: '',
};

export const createCharacterSlice: StateCreator<
    RootStore,
    [['zustand/devtools', never]],
    [],
    CharacterSlice
> = (set) => ({
    character: initialState,
    move: ({ x, y, dirKey }) =>
        set(
            (state) => ({
                ...state,
                character: {
                    ...state.character,
                    x: state.character.x + x,
                    y: state.character.y + y,
                    step:
                        state.character.step < 2 ? state.character.step + 1 : 0,
                    dir: directions[dirKey as keyof KeyDirections],
                },
            }),
            undefined,
            'root:chracter/move'
        ),

    bufferImage: ({ heroImg }) =>
        set(
            (state) => ({
                ...state,
                character: { ...state.character, heroImg },
            }),
            undefined,
            'root:chracter/bufferImage'
        ),

    addToInventory: ({ item }) =>
        set(
            (state) => ({
                ...state,
                character: {
                    ...state.character,
                    inventory: [...state.character.inventory, item],
                },
            }),
            undefined,
            'root:chracter/addToInventory'
        ),

    updateInventoryItemInUse: ({ id }) =>
        set(
            (state) => ({
                ...state,
                character: {
                    ...state.character,
                    inventory: state.character.inventory.map((item) =>
                        item.id === id ? { ...item, inUse: !item.inUse } : item
                    ),
                },
            }),
            undefined,
            'root:chracter/updateInventoryItemInUse'
        ),

    updatePlayerPosition: ({ x, y, step, dir }) =>
        set(
            (state) => ({
                ...state,
                character: {
                    ...state.character,
                    x,
                    y,
                    step,
                    dir,
                },
            }),
            undefined,
            'root:chracter/updatePlayerPosition'
        ),

    updatePlayerSummary: ({ updates }) =>
        set(
            (state) => ({
                ...state,
                character: {
                    ...state.character,
                    playerSummary: {
                        ...state.character.playerSummary,
                        ...updates,
                    },
                },
            }),
            undefined,
            'root:chracter/updatePlayerSummary'
        ),

    updateCharacterState: (updates) =>
        set(
            (state) => ({
                ...state,
                character: { ...state.character, ...updates },
            }),
            undefined,
            'root:chracter/updateCharacterState'
        ),
});

export const isFullyGeared = (state: RootStore) =>
    state.character?.inventory.filter((obj) =>
        ['Armor', 'Boots', 'Sword'].includes(obj.item)
    ).length;
