import {createSlice, PayloadAction} from '@reduxjs/toolkit';


interface MapState {
    [key:string]: number
}
const mapImagesSlice = createSlice({
    name: 'images',
    initialState: {} as MapState,
    reducers: {
        bufferImage(state, action: PayloadAction<string>) {
            const path = action.payload;
            if (path) {
                state[path] = 1;
            }            
        },
    }
});

export const { bufferImage } = mapImagesSlice.actions;

export default mapImagesSlice.reducer;
