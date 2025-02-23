import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import JihoonFight from '../../../images/heroes/jihoon_fight.png';
import JihoonPortrait from '../../../images/heroes/jihoon_portrait.png';
import { ObjectNPC } from '../../objectNPC/slices/objectSlice';

export interface CharacterState {
    x: number;
    y: number;
    step: number;
    dir: number;
    heroClass: string;
    heroImg: string | null;
    type: string;
    playerSummary: CharSummary;
    portrait: string; // Assuming JihoonPortrait is a string path
    inventory: Array<ObjectNPC>; // You may want to replace 'any' with a specific type for items
}

export interface CharSummary {
    level: number;
    health: number;
    maxHealth: number;
    name: string;
    img: string; // Assuming JihoonFight and JihoonPortrait are string paths
    magic: number;
    attack: number;
    defense: number;
    magicDefense: number;
}

export interface AddToInventoryAction {
    item: ObjectNPC; // You may want to replace 'any' with a specific type for items
}

export interface UpdatePlayerPositionAction {
    x: number;
    y: number;
    step: number;
    dir: number;
}

export interface UpdatePlayerSummaryAction {
    updates: Partial<CharSummary>;
}

interface KeyDirections {
    s: number;
    a: number;
    d: number;
    w: number;
}
const directions = {
    s: 0,
    a: 1,
    d: 2,
    w: 3,
} as KeyDirections;

export interface MoveAction {
    x: number;
    y: number;
    dirKey: string;
}

export interface BufferImageAction {
    heroImg: null | string;
}

const characterSlice = createSlice({
    name: 'character',
    initialState: {
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
    } as CharacterState,
    reducers: {
        move(state, action: PayloadAction<MoveAction>) {
            const { x, y, dirKey } = action.payload;
            state.x += x;
            state.y += y;
            state.step = state.step < 3 - 1 ? state.step + 1 : 0;
            state.dir = directions[dirKey as keyof KeyDirections];
        },
        bufferImage(state, action: PayloadAction<BufferImageAction>) {
            state.heroImg = action.payload.heroImg;
        },
        addToInventory(state, action: PayloadAction<AddToInventoryAction>) {
            state.inventory.push(action.payload.item);
        },
        updatePlayerPosition(
            state,
            action: PayloadAction<UpdatePlayerPositionAction>
        ) {
            state.x = action.payload.x;
            state.y = action.payload.y;
            state.step = action.payload.step;
            state.dir = action.payload.dir;
        },
        updatePlayerSummary(
            state,
            action: PayloadAction<UpdatePlayerSummaryAction>
        ) {
            state.playerSummary = {
                ...state.playerSummary,
                ...action.payload.updates,
            };
        },
        updateCharacterState(_, action: PayloadAction<CharacterState>) {
            return action.payload;
        },
    },
});

export const {
    move,
    bufferImage,
    addToInventory,
    updatePlayerPosition,
    updatePlayerSummary,
    updateCharacterState,
} = characterSlice.actions;

export default characterSlice.reducer;
