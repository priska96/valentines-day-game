import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import BlueDragonFight from '../../../images/heroes/blue-dragon_fight.png';
import EvilKingFight from '../../../images/heroes/evil-king_fight.png';
import EvilQueenFight from '../../../images/heroes/evil-queen_fight.png';
import RabbitFight from '../../../images/heroes/rabbit_fight.png';
import RabbitSkeletonFight from '../../../images/heroes/bones_rabbit_fight.png';
import SkeletonFight from '../../../images/heroes/skeleton_fight.png';
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
            {
                id: 'npc-0',
                x: 8,
                y: 10,
                step: 0,
                dir: 1,
                followHero: false,
                heroClass: 'DRAGON',
                heroImg: null,
                stopMoving: false,
                type: 'npc',
                map: ['forest', 'sky'],
                dead: false,
                animate: '',
                npcSummary: {
                    main: false,
                    name: 'Blue Dragon',
                    img: BlueDragonFight,
                    level: 2,
                    health: 150,
                    maxHealth: 150,

                    magic: 42,
                    attack: 70,
                    defense: 30,
                    magicDefense: 30,
                },
            },
            {
                id: 'npc-1',
                x: 8,
                y: 3,
                step: 0,
                dir: 0,
                followHero: false,
                heroClass: 'PUREEVIL',
                heroImg: null,
                stopMoving: true,
                type: 'npc',
                map: ['evilKing'],
                dead: false,
                animate: '',
                npcSummary: {
                    main: false,
                    name: 'Evil King',
                    img: EvilKingFight,
                    level: 10,
                    health: 1,
                    maxHealth: 355,
                    magic: 70,
                    attack: 65,
                    defense: 40,
                    magicDefense: 40,
                },
            },
            {
                id: 'npc-2',
                x: 3,
                y: 13,
                step: 0,
                dir: 0,
                followHero: false,
                heroClass: 'PRINCESS',
                heroImg: null,
                stopMoving: true,
                type: 'npc',
                map: ['evilKing'],
                dead: false,
                animate: '',
                npcSummary: {
                    main: false,
                    name: 'Pri',
                    level: 2,
                    health: 24,
                    maxHealth: 244,
                },
            },
            {
                id: 'npc-3',
                x: 0,
                y: 0,
                step: 0,
                dir: 1,
                followHero: false,
                heroClass: 'PUREEVIL',
                heroImg: null,
                stopMoving: true,
                type: 'npc',
                map: ['piscesTown3'],
                dead: false,
                animate: '',
                npcSummary: {
                    main: false,
                    name: 'Evil Queen',
                    img: EvilQueenFight,
                    level: 15,
                    health: 455,
                    maxHealth: 455,
                    magic: 80,
                    attack: 65,
                    defense: 40,
                    magicDefense: 40,
                },
            },
            {
                id: 'npc-4',
                x: 0,
                y: 0,
                step: 0,
                dir: 2,
                followHero: false,
                heroClass: 'KING',
                heroImg: null,
                stopMoving: true,
                type: 'npc',
                map: ['piscesTown3'],
                dead: false,
                animate: '',
                npcSummary: {
                    main: false,
                    name: 'PiscesTown King',
                    level: 2,
                    health: 24,
                    maxHealth: 244,
                },
            },
            {
                id: 'npc-5',
                x: 0,
                y: 0,
                step: 0,
                dir: 0,
                followHero: false,
                heroClass: 'NPC',
                heroImg: null,
                stopMoving: true,
                type: 'npc',
                map: ['piscesTown3Melted'],
                dead: false,
                animate: '',
                npcSummary: {
                    main: false,
                    name: 'Servant 1',
                    level: 2,
                    health: 24,
                    maxHealth: 244,
                },
            },
            {
                id: 'npc-6',
                x: 0,
                y: 0,
                step: 0,
                dir: 0,
                followHero: false,
                heroClass: 'NPC',
                heroImg: null,
                stopMoving: true,
                type: 'npc',
                map: ['piscesTown3Melted'],
                dead: false,
                animate: '',
                npcSummary: {
                    main: false,
                    name: 'Servant 2',
                    level: 2,
                    health: 24,
                    maxHealth: 244,
                },
            },
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
