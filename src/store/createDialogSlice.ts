import { StateCreator } from 'zustand';
import { DialogSlice, DialogState, RootStore } from './types';
import { DialogActionEnum } from './enums';

export const initialDialogState: DialogState = {
    open: false,
    title: '',
    text: '',
    openerId: '',
    action: DialogActionEnum.DEFAULT,
};

export const createDialogSlice: StateCreator<
    RootStore,
    [['zustand/devtools', never]],
    [],
    DialogSlice
> = (set) => ({
    dialog: initialDialogState,

    setContents: (payload) =>
        set(
            (state) => ({ ...state, dialog: { ...state.dialog, ...payload } }),
            undefined,
            'root:dialog/setContents'
        ),

    updateDialogState: (newState) =>
        set(
            (state) => ({ ...state, dialog: newState }),
            undefined,
            'root:dialog/updateDialogState'
        ),
});
