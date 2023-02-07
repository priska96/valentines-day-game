import {createSlice} from '@reduxjs/toolkit';

const directions = {
    s: 0,
    a: 1,
    d: 2,
    w: 3
}

const characterSlice = createSlice({
    name: 'character',
    initialState: {
        x: 7,
        y: 7,//1,
        step:0,
        dir:0,
        heroClass: 'SWORDSMAN',
        heroImg: null,
        playerSummary:{
            level: 0,
            health: 20,
            maxHealth: 177,
            name: 'Jihoon',
            img: '/assets/heroes/jihoon_fight.png',

            magic: 32,
            attack: 50,
            defense: 30,
            magicDefense: 30,
        },
        portrait: '/assets/heroes/jihoon_portrait.png',
        inventory:[]
    },
    reducers: {
        move(state, action) {
            const [x, y, dirKey] = action.payload;
            state.x+=x;
            state.y+=y;
            state.step=state.step < 3 - 1 ? state.step + 1 : 0;
            state.dir=directions[dirKey];
        },
        bufferImage(state, action) {
            state.heroImg = action.payload;
        },
        addToInventory(state, action){
            debugger
            console.log('toinventar')
            state.inventory.push(action.payload.item);
        },
        updatePlayerSummary(state, action) {
            state.playerSummary = {...state.playerSummary, ...action.payload};
        },
    }
});

export const { move, bufferImage, addToInventory, updatePlayerSummary } = characterSlice.actions;

export default characterSlice.reducer;