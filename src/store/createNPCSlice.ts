import { StateCreator } from 'zustand';
import RabbitFight from '../images/heroes/rabbit_fight.png';
import RabbitSkeletonFight from '../images/heroes/bones_rabbit_fight.png';
import SkeletonFight from '../images/heroes/skeleton_fight.png';
import {
    ancientSeer,
    citizen1,
    citizen10,
    citizen2,
    citizen3,
    citizen4,
    citizen5,
    citizen6,
    citizen7,
    citizen8,
    citizen9,
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
import { directions, KeyDirections, NPCSlice, RootStore } from './types';

export const createNPCSlice: StateCreator<
    RootStore,
    [['zustand/devtools', never]],
    [],
    NPCSlice
> = (set) => ({
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
            map: ['forest2', 'forest3'],
            dead: false,
            animate: '',
            npcSummary: {
                main: false,
                name: 'Wild Rabbit',
                img: RabbitFight,
                level: 10,
                health: 1755,
                maxHealth: 1755,
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
            map: ['forest2', 'forest3'],
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
            heroClass: 'WILD SKELETON',
            heroImg: null,
            stopMoving: true,
            type: 'npc',
            map: ['forest2', 'forest3'],
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
        citizen6,
        citizen7,
        citizen8,
        citizen9,
        citizen10,
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

    moveNPC: ({ idx, x, y, dirKey }) =>
        set(
            (state) => ({
                ...state,
                npcs: state.npcs.map((npc, i) =>
                    i === idx
                        ? {
                              ...npc,
                              x: npc.x + x,
                              y: npc.y + y,
                              step: npc.step < 2 ? npc.step + 1 : 0,
                              dir: directions[dirKey as keyof KeyDirections],
                          }
                        : npc
                ),
            }),
            undefined,
            'root:npc/moveNPC'
        ),

    bufferImageNPC: ({ idx, heroImg }) =>
        set(
            (state) => ({
                ...state,
                npcs: state.npcs.map((npc, i) =>
                    i === idx ? { ...npc, heroImg } : npc
                ),
            }),
            undefined,
            'root:npc/bufferImageNPC'
        ),

    fireActionNPC: ({ idx }) =>
        set(
            (state) => ({
                ...state,
                npcs: state.npcs.map((npc, i) =>
                    i === idx ? { ...npc, stopMoving: !npc.stopMoving } : npc
                ),
            }),
            undefined,
            'root:npc/fireActionNPC'
        ),

    updateNPC: ({ idx, updates }) =>
        set(
            (state) => ({
                ...state,
                npcs: state.npcs.map((npc, i) =>
                    idx.includes(i) ? { ...npc, ...updates[i] } : npc
                ),
            }),
            undefined,
            'root:npc/updateNPC'
        ),

    updateNPCState: (newState) =>
        set(
            (state) => ({ ...state, npcs: newState }),
            undefined,
            'root:npc/updateNPCState'
        ),
});
