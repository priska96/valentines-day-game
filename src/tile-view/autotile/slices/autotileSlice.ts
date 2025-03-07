import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface KeyDirections {
    s: number;
    a: number;
    d: number;
    w: number;
}
const directions = {
    s: 0,
    a: 1,
    d: 2,
    w: 3,
} as KeyDirections;

export interface Autotile {
    id: string;
    x: number;
    y: number;
    step: number;
    dir: number;
    autotileImg: null | string;
    stopMoving: boolean;
    type: string;
    map: string[];
    animate: string;
}

export interface AutotileState {
    autotiles: Autotile[];
}

export interface MoveAction {
    x: number;
    y: number;
    dirKey: string;
    idx: number;
}

export interface BufferImageAction {
    idx: number;
    autotileImg: null | string;
}

export interface FireAction {
    idx: number;
}

export interface UpdateAutotileAction {
    idx: number[];
    updates: { [key: string]: Partial<Autotile> };
}

const autotileSlice = createSlice({
    name: 'autotile',
    initialState: {
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
    } as AutotileState,
    reducers: {
        move(state, action: PayloadAction<MoveAction>) {
            const { x, y, dirKey, idx } = action.payload;
            state.autotiles[idx].x += x;
            state.autotiles[idx].y += y;
            state.autotiles[idx].step =
                state.autotiles[idx].step < 3 - 1
                    ? state.autotiles[idx].step + 1
                    : 0;
            state.autotiles[idx].dir =
                directions[dirKey as keyof KeyDirections];
        },
        bufferImage(state, action: PayloadAction<BufferImageAction>) {
            const { idx, autotileImg } = action.payload;
            state.autotiles[idx].autotileImg = autotileImg;
        },
        updateAutotileState(_, action: PayloadAction<AutotileState>) {
            return action.payload;
        },
    },
});

export const { move, bufferImage, updateAutotileState } = autotileSlice.actions;

export default autotileSlice.reducer;
