import {createSlice} from '@reduxjs/toolkit';
import JihoonFight from "./../../images/heroes/jihoon_fight.png"
import JihoonPortrait from "./../../images/heroes/jihoon_portrait.png"

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
            img: JihoonFight,

            magic: 32,
            attack: 50,
            defense: 30,
            magicDefense: 30,
        },
        portrait: JihoonPortrait,
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
            //debugger
            console.log('toinventar')
            state.inventory.push(action.payload.item);
        },
        updatePlayerPosition(state, action) {
            console.log(action.payload)
            state.x = action.payload.x;
            state.y = action.payload.y;
            state.step = action.payload.step;
            state.dir = action.payload.dir;
        },

        updatePlayerSummary(state, action) {
            state.playerSummary = {...state.playerSummary, ...action.payload};
        },
    }
});

export const { move, bufferImage, addToInventory, updatePlayerPosition, updatePlayerSummary } = characterSlice.actions;

export default characterSlice.reducer;