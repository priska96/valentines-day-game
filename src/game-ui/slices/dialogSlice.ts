import {createSlice} from '@reduxjs/toolkit';

export interface DialogState{
    open: boolean;
    title: string;
    text:string;
    openerId:string;
    action: string;
}

const dialogSlice = createSlice({
    name: 'dialog',
    initialState: {
        open: false,
        title: '',
        text: '',
        openerId: '',
        action: ''
    } as DialogState,
    reducers: {
        setContents(state, action) {
            state.open = action.payload.open;
            state.title = action.payload.title;
            state.text = action.payload.text;
            state.openerId = action.payload.openerId;
            state.action = action.payload.action;
        },
    }
});

export const { setContents } = dialogSlice.actions;

export default dialogSlice.reducer;