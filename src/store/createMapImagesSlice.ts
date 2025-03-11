import { StateCreator } from 'zustand';
import { MapImagesSlice, RootStore } from './types';

export const createMapImagesSlice: StateCreator<
    RootStore,
    [['zustand/devtools', never]],
    [],
    MapImagesSlice
> = (set) => ({
    mapImages: {},
    bufferMapImage: (path) =>
        set(
            (state) => ({
                ...state,
                mapImages: {
                    ...state.mapImages,
                    [path]: 1,
                },
            }),
            undefined,
            'root:mapImages/bufferMapImage'
        ),
});
