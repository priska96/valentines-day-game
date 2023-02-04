import {createSlice} from '@reduxjs/toolkit';


const dialogSlice = createSlice({
    name: 'dialog',
    initialState: {
        open: false,
        title: '',
        text: '',
        openerId: ''
    },
    reducers: {
        setContents(state, action) {
            //console.log('setconents')
            state.open = action.payload.open;
            state.title = action.payload.title;
            state.text = action.payload.text;
            state.openerId = action.payload.openerId;
        },
    }
});

export const { setContents } = dialogSlice.actions;

export default dialogSlice.reducer;