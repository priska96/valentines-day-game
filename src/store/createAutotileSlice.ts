import { StateCreator } from 'zustand';
import { AutotileSlice, directions, KeyDirections, RootStore } from './types';

export const createAutotileSlice: StateCreator<
    RootStore,
    [['zustand/devtools', never]],
    [],
    AutotileSlice
> = (set) => ({
    autotiles: [
        {
            id: 'autotile-0',
            x: 8,
            y: 14,
            step: 0,
            dir: 0,
            autotileImg: null,
            stopMoving: false,
            type: 'autotile',
            map: ['wellInner'],
            animate: '',
        },
    ],

    moveAutotile: ({ x, y, dirKey, idx }) =>
        set(
            (state) => {
                const autotileCopy = [...state.autotiles];
                autotileCopy[idx].x += x;
                autotileCopy[idx].y += y;
                autotileCopy[idx].step =
                    autotileCopy[idx].step < 3 - 1
                        ? autotileCopy[idx].step + 1
                        : 0;
                autotileCopy[idx].dir =
                    directions[dirKey as keyof KeyDirections];
                return { ...state, autotiles: autotileCopy };
            },
            undefined,
            'root:autotile/moveAutotile'
        ),

    bufferImageAutotile: ({ idx, autotileImg }) =>
        set(
            (state) => {
                const autotileCopy = [...state.autotiles];
                autotileCopy[idx].autotileImg = autotileImg;
                return { ...state, autotiles: autotileCopy };
            },
            undefined,
            'root:autotile/bufferImageAutotile'
        ),

    updateAutotileState: (autotiles) =>
        set(
            (state) => {
                return { ...state, autotiles };
            },
            undefined,
            'root:autotile/updateAutotileState'
        ),
});
