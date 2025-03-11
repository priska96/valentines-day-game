import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { RootStore } from './types';
import { createAutotileSlice } from './createAutotileSlice';
import { createCharacterSlice } from './createCharacterSlice';
import { createNPCSlice } from './createNPCSlice';
import { createGameStatusSlice } from './createGameStatusSlice';
import { createObjectNPCSlice } from './createObjectNPCSlice';
import { createDialogSlice } from './createDialogSlice';
import { createMapImagesSlice } from './createMapImagesSlice';

export const useRootStore = create<RootStore>()(
    devtools(
        (...args) => ({
            ...createMapImagesSlice(...args),
            ...createCharacterSlice(...args),
            ...createNPCSlice(...args),
            ...createAutotileSlice(...args),
            ...createGameStatusSlice(...args),
            ...createObjectNPCSlice(...args),
            ...createDialogSlice(...args),
        }),
        { name: 'TheRescueRootStore' }
    )
);
