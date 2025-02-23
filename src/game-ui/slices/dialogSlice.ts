import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface DialogState {
    open: boolean;
    title: string;
    text: string;
    openerId: string;
    action: string;
}
export interface SetContentsAction {
    open: boolean;
    title: string;
    text: string;
    openerId: string;
    action: string;
}

const dialogSlice = createSlice({
    name: 'dialog',
    initialState: {
        open: false,
        title: '',
        text: '',
        openerId: '',
        action: '',
    } as DialogState,
    reducers: {
        setContents(state, action: PayloadAction<SetContentsAction>) {
            state.open = action.payload.open;
            state.title = action.payload.title;
            state.text = action.payload.text;
            state.openerId = action.payload.openerId;
            state.action = action.payload.action;
        },
        updateDialogState(_, action: PayloadAction<DialogState>) {
            return action.payload;
        },
    },
});

export const { setContents, updateDialogState } = dialogSlice.actions;

export default dialogSlice.reducer;
