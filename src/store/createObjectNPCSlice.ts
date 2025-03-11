import { StateCreator } from 'zustand';
import { ObjectNPCSlice, RootStore } from './types';

export const createObjectNPCSlice: StateCreator<
    RootStore,
    [['zustand/devtools', never]],
    [],
    ObjectNPCSlice
> = (set) => ({
    objectNPCs: [
        {
            id: 'object-0',
            x: 12,
            y: 8,
            item: 'Armor',
            objectImg: null,
            type: 'objectNPC',
            map: ['forest'],
            tookItem: false,
            healing: 0,
            action: '',
            inUse: false,
        },
        {
            id: 'object-1',
            x: 15,
            y: 2,
            item: 'Boots',
            objectImg: null,
            type: 'objectNPC',
            map: ['forest'],
            tookItem: false,
            healing: 0,
            action: '',
            inUse: false,
        },
        {
            id: 'object-2',
            x: 1,
            y: 5,
            item: 'Apples',
            objectImg: null,
            type: 'objectNPC',
            map: ['forest'],
            tookItem: false,
            healing: 20,
            action: '',
            inUse: false,
        },
        {
            id: 'object-3',
            x: 2,
            y: 3,
            item: 'Fish',
            objectImg: null,
            type: 'objectNPC',
            map: ['forest'],
            tookItem: false,
            healing: 30,
            action: '',
            inUse: false,
        },
        {
            id: 'object-4',
            x: 2,
            y: 13,
            item: 'Sword',
            objectImg: null,
            type: 'objectNPC',
            map: ['forest'],
            tookItem: false,
            healing: 0,
            action: '',
            inUse: false,
        },
        {
            id: 'object-5',
            x: 0,
            y: 0,
            item: 'doorOpenTop',
            objectImg: null,
            type: 'objectNPC',
            map: ['evilKing'],
            tookItem: false,
            healing: 0,
            action: '',
            inUse: false,
        },
        {
            id: 'object-6',
            x: 0,
            y: 0,
            item: 'doorOpenBottom',
            objectImg: null,
            type: 'objectNPC',
            map: ['evilKing'],
            tookItem: false,
            healing: 0,
            action: '',
            inUse: false,
        },
    ],

    fireActionObjectNPC: ({ idx }) =>
        set(
            (state) => {
                const updatedObjects = [...state.objectNPCs];
                updatedObjects[idx] = {
                    ...updatedObjects[idx],
                    tookItem: true,
                };
                return {
                    ...state,
                    objectNPCs: updatedObjects,
                };
            },
            undefined,
            'root:objectNPC/fireActionObjectNPC'
        ),

    bufferImageObjectNPC: ({ idx, objectImg }) =>
        set(
            (state) => {
                const updatedObjects = [...state.objectNPCs];
                updatedObjects[idx].objectImg = objectImg as string;
                return {
                    ...state,
                    objectNPCs: updatedObjects,
                };
            },
            undefined,
            'root:objectNPC/bufferImageObjectNPC'
        ),

    updateObjectNPC: ({ idx, updates }) =>
        set(
            (state) => {
                const updatedObjects = [...state.objectNPCs];
                idx.forEach((index) => {
                    updatedObjects[index] = {
                        ...updatedObjects[index],
                        ...updates[`data-${index}`],
                    };
                });
                return {
                    ...state,
                    objectNPCs: updatedObjects,
                };
            },
            undefined,
            'root:objectNPC/updateObjectNPC'
        ),

    updateObjectNPCState: (newState) =>
        set(
            (state) => ({ ...state, objectNPCs: newState }),
            undefined,
            'root:objectNPC/updateObjectNPCState'
        ),
});
