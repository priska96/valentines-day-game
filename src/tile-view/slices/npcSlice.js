import {createSlice} from '@reduxjs/toolkit';
import BlueDragonFight from "./../../images/heroes/blue-dragon_fight.png"
import EvilKingFight from "./../../images/heroes/evil-king_fight.png"

const directions = {
    s: 0,
    a: 1,
    d: 2,
    w: 3
}

const npcSlice = createSlice({
    name: 'npc',
    initialState: {
        npcs: [
            {
                id: "npc-0",
                x: 15,
                y: 6,
                step: 0,
                dir: 0,
                heroClass: 'DRAGON',
                heroImg: null,
                stopMoving: false,
                type: 'npc',
                map:['forest', 'sky'],
                dead: false,
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
                }
            },
            {
                id: "npc-1",
                x: 0,//8,
                y: 0,//3,
                step: 0,
                dir: 0,
                heroClass: 'PUREEVIL',
                heroImg: null,
                stopMoving: false,
                type: 'npc',
                map:['evilKing'],
                dead: false,
                npcSummary: {
                    main: false,
                    name: 'Evil King',
                    img: EvilKingFight,
                    level: 10,
                    health: 355,
                    maxHealth: 355,
                    magic: 70,
                    attack: 65,
                    defense: 40,
                    magicDefense: 40,
                }
            },
            {
                id: "npc-2",
                x: 0,//3,
                y: 0,//13,
                step: 0,
                dir: 0,
                heroClass: 'PRINCESS',
                heroImg: null,
                stopMoving: false,
                type: 'npc',
                map:['evilKing'],
                dead: false,
                npcSummary: {
                    main: false,
                    name: 'Pri',
                    level: 2,
                    health: 24,
                    maxHealth: 244,
                }
            },
        ]
    },
    reducers: {
        move(state, action) {
            const [x, y, dirKey, idx] = action.payload;
            state.npcs[idx].x += x;
            state.npcs[idx].y += y;
            state.npcs[idx].step = state.npcs[idx].step < 3 - 1 ? state.npcs[idx].step + 1 : 0;
            state.npcs[idx].dir = directions[dirKey];
        },
        bufferImage(state, action) {
            state.npcs[action.payload.idx].heroImg = action.payload.heroImg;
        },
        fireAction(state, action) {
            state.npcs[action.payload.idx].stopMoving = !state.npcs[action.payload.idx].stopMoving;
        },
        updateNPC(state, action) {
            action.payload.idx.forEach((index)=>{
                state.npcs[index] = {...state.npcs[index] , ...action.payload[`data-${index}`]}
            })
        }
    }
});

export const {move, bufferImage, fireAction, updateNPC} = npcSlice.actions;

export default npcSlice.reducer;