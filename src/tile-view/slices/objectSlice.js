import {createSlice} from '@reduxjs/toolkit';


const objectSlice = createSlice({
    name: 'objectNPC',
    initialState: {
        objects: [
            {
            id: "object-0",
            x: 12,
            y: 8,
            item: 'Armor',
            objectImg: null,
            type: 'objectNPC',
            tookItem: false,
                healing: 0
        },
            {
            id: "object-1",
            x: 15,
            y: 2,
            item: 'Boots',
            objectImg: null,
            type: 'objectNPC',
            tookItem: false,
                healing: 0
        },
            {
            id: "object-2",
            x: 1,
            y: 5,
            item: 'Apples',
            objectImg: null,
            type: 'objectNPC',
            tookItem: false,
                healing: 20
        },
            {
            id: "object-3",
            x: 2,
            y: 3,
            item: 'Fish',
            objectImg: null,
            type: 'objectNPC',
            tookItem: false,
                healing: 30
        },
            {
                id: "object-4",
                x: 2,
                y: 13,
                item: 'Sword',
                objectImg: null,
                type: 'objectNPC',
                tookItem: false,
                healing: 0
            }
        ]
    },
    reducers: {
        fireAction(state, action) {
            state.objects[action.payload.idx].tookItem = true;

        },
        bufferImage(state, action) {
            state.objects[action.payload.idx].objectImg = action.payload.objectImg;
        }
    }
});

export const {fireAction, bufferImage} = objectSlice.actions;

export default objectSlice.reducer;