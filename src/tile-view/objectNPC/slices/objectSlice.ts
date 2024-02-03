import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface ObjectNPC {
    id: string;
    x: number;
    y: number;
    item: string;
    objectImg: any;
    type: string;
    map: string[];
    tookItem: boolean;
    healing: number;
}

export interface ObjectState {
    objects: ObjectNPC[];
}

interface FireAction {
        idx: number;
}

export interface BufferImageAction {
        idx: number;
        objectImg: any;
}

interface UpdateObjectAction {
        idx: number[];
        [key: string]: any;
}

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
                map: ['forest'],
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
                map: ['forest'],
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
                map: ['forest'],
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
                map: ['forest'],
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
                map: ['forest'],
                tookItem: false,
                healing: 0
            }
            ,
            {
                id: "object-5",
                x: 0,
                y: 0,
                item: 'doorOpenTop',
                objectImg: null,
                type: 'objectNPC',
                map: ['evilKing'],
                tookItem: false,
                healing: 0
            },
            {
                id: "object-6",
                x: 0,
                y: 0,
                item: 'doorOpenBottom',
                objectImg: null,
                type: 'objectNPC',
                map: ['evilKing'],
                tookItem: false,
                healing: 0
            }
        ]
    } as ObjectState,
    reducers: {
        fireAction(state, action: PayloadAction<FireAction>) {
            state.objects[action.payload.idx].tookItem = true;
        },
        bufferImage(state, action: PayloadAction<BufferImageAction>) {
            const { idx, objectImg } = action.payload;
            state.objects[idx].objectImg = objectImg;
        },
        updateObject(state, action: PayloadAction<UpdateObjectAction>) {
            action.payload.idx.forEach((index) => {
                state.objects[index] = { ...state.objects[index], ...action.payload[`data-${index}`] };
            });
        },
    },
});

export const {fireAction, bufferImage, updateObject} = objectSlice.actions;

export default objectSlice.reducer;