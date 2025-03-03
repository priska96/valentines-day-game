import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import RabbitFight from '../../../images/heroes/rabbit_fight.png';
import RabbitSkeletonFight from '../../../images/heroes/bones_rabbit_fight.png';
import SkeletonFight from '../../../images/heroes/skeleton_fight.png';
import {
    ancientSeer,
    citizen1,
    citizen2,
    citizen3,
    citizen4,
    citizen5,
    evilQueen,
    king,
    princessPriska,
    servant1,
    servant2,
} from './npcs/piscesTown';
import { blueDragon, evilKing } from './npcs/forest';
import {
    beigeFish,
    blueFish,
    greenFish,
    mermaid1,
    mermaid2,
    mermaidQueen,
    merman1,
    merman2,
    redFish,
    seaMonster1,
    seaMonster2,
    whiteFish,
} from './npcs/underwater';
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

export interface NPCSummary {
    main?: boolean;
    name?: string;
    img?: string;
    level?: number;
    health?: number;
    maxHealth?: number;
    magic?: number;
    attack?: number;
    defense?: number;
    magicDefense?: number;
}

export interface NPC {
    id: string;
    x: number;
    y: number;
    step: number;
    dir: number;
    followHero: boolean;
    heroClass: string;
    heroImg: null | string;
    stopMoving: boolean;
    type: string;
    map: string[];
    dead: boolean;
    animate: string;
    npcSummary: NPCSummary;
}

export interface NPCState {
    npcs: NPC[];
}

export interface MoveAction {
    x: number;
    y: number;
    dirKey: string;
    idx: number;
}

export interface BufferImageAction {
    idx: number;
    heroImg: null | string;
}

export interface FireAction {
    idx: number;
}

export interface UpdateNPCAction {
    idx: number[];
    updates: { [key: string]: Partial<NPC> };
}

const npcSlice = createSlice({
    name: 'npc',
    initialState: {
        npcs: [
            blueDragon,
            evilKing,
            princessPriska,
            evilQueen,
            king,
            servant1,
            servant2,
            {
                id: 'npc-7',
                x: 0,
                y: 0,
                step: 0,
                dir: 0,
                followHero: false,
                heroClass: 'WILD RABBIT',
                heroImg: null,
                stopMoving: true,
                type: 'npc',
                map: ['forest2, forest3'],
                dead: false,
                animate: '',
                npcSummary: {
                    main: false,
                    name: 'Wild Rabbit',
                    img: RabbitFight,
                    level: 10,
                    health: 1755,
                    maxHealth: 175,
                    magic: 30,
                    attack: 65,
                    defense: 40,
                    magicDefense: 40,
                },
            },
            {
                id: 'npc-8',
                x: 0,
                y: 0,
                step: 0,
                dir: 0,
                followHero: false,
                heroClass: 'WILD RABBIT SKELETON',
                heroImg: null,
                stopMoving: true,
                type: 'npc',
                map: ['forest2, forest3'],
                dead: false,
                animate: '',
                npcSummary: {
                    main: false,
                    name: 'Wild Rabbit Skeleton',
                    img: RabbitSkeletonFight,
                    level: 11,
                    health: 200,
                    maxHealth: 200,
                    magic: 30,
                    attack: 65,
                    defense: 40,
                    magicDefense: 40,
                },
            },
            {
                id: 'npc-9',
                x: 0,
                y: 0,
                step: 0,
                dir: 0,
                followHero: false,
                heroClass: 'WILD RABBIT SKELETON',
                heroImg: null,
                stopMoving: true,
                type: 'npc',
                map: ['forest2, forest3'],
                dead: false,
                animate: '',
                npcSummary: {
                    main: false,
                    name: 'Wild Skeleton',
                    img: SkeletonFight,
                    level: 12,
                    health: 230,
                    maxHealth: 230,
                    magic: 30,
                    attack: 65,
                    defense: 40,
                    magicDefense: 40,
                },
            },
            ancientSeer,
            citizen1,
            citizen2,
            citizen3,
            citizen4,
            citizen5,
            whiteFish,
            blueFish,
            greenFish,
            beigeFish,
            redFish,
            merman1,
            mermaid1,
            merman2,
            mermaid2,
            mermaidQueen,
            seaMonster1,
            seaMonster2,
        ],
    } as NPCState,
    reducers: {
        move(state, action: PayloadAction<MoveAction>) {
            const { x, y, dirKey, idx } = action.payload;
            state.npcs[idx].x += x;
            state.npcs[idx].y += y;
            state.npcs[idx].step =
                state.npcs[idx].step < 3 - 1 ? state.npcs[idx].step + 1 : 0;
            state.npcs[idx].dir = directions[dirKey as keyof KeyDirections];
        },
        bufferImage(state, action: PayloadAction<BufferImageAction>) {
            const { idx, heroImg } = action.payload;
            state.npcs[idx].heroImg = heroImg;
        },
        fireAction(state, action: PayloadAction<FireAction>) {
            state.npcs[action.payload.idx].stopMoving =
                !state.npcs[action.payload.idx].stopMoving;
        },
        updateNPC(state, action: PayloadAction<UpdateNPCAction>) {
            action.payload.idx.forEach((index) => {
                state.npcs[index] = {
                    ...state.npcs[index],
                    ...action.payload.updates[`data-${index}`],
                };
            });
        },
        updateNPCState(_, action: PayloadAction<NPCState>) {
            return action.payload;
        },
    },
});

export const { move, bufferImage, fireAction, updateNPC, updateNPCState } =
    npcSlice.actions;

export default npcSlice.reducer;
