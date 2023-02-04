import {createSlice} from '@reduxjs/toolkit';

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
                npcSummary: {
                    main: false,
                    name: 'Blue Dragon',
                    level: 0,
                    health: 100,
                    maxHealth: 100,
                }
            },
            {
                id: "npc-1",
                x: 12,
                y: 6,
                step: 0,
                dir: 0,
                heroClass: 'PUREEVIL',
                heroImg: null,
                stopMoving: false,
                type: 'npc',
                npcSummary: {
                    main: false,
                    name: 'Evil King',
                    level: 5,
                    health: 355,
                    maxHealth: 355,
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
        }
    }
});

export const {move, bufferImage, changeRandomMove, fireAction} = npcSlice.actions;

export default npcSlice.reducer;