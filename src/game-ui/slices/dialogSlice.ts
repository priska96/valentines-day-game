import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export enum DialogActionEnum {
    VICOTRY = 'victory',
    VIDEO = 'video',
    PHOTO = 'photo',
    GO_TO_SKY = 'go-to-sky',
    ENTER_DUNGEON = 'enter-dungeon',
    BATTLE_EVIL_KING = 'battle-evil-king',
    GAME_OVER = 'game-over',
    FOLLOW_HERO = 'follow-hero',
    EXIT_DUNGEON = 'exit-dungeon',
    LEAVE_DUNGEON = 'leave-dungeon',
    GO_TO_GROUND = 'go-to-ground',
    FOLLOW_HERO_HOME = 'follow-hero-home',
    BEFORE_BATTLE_EVIL_QUEEN = 'before-battle-evil-queen',
    BEFORE_BATTLE_EVIL_QUEEN2 = 'before-battle-evil-queen2',
    BATTLE_EVIL_QUEEN = 'battle-evil-queen',
    VICTORY_EVIL_QUEEN = 'victory-evil-queen',
    GAME_OVER_EVIL_QUEEN = 'game-over-evil-queen',
    GAME_WON_EVIL_QUEEN = 'game-won-evil-queen',
    REWARDED_KING = 'rewarded-king',
    RECEIVE_SWORD = 'receive-sword',
    SPELL_BROKEN = 'spell-broken',
    SEER_COMES_OUT = 'seer-comes-out',
    COLLECT_MERMAID_TEAR = 'collect-mermaid-tear',
    RECEIVE_POTION = 'receive-potion',
    GO_TO_MERMAID_CITY = 'go-to-mermaid-city',
    SEA_MONSTER1_BATTLE = 'sea-monster1-battle',
    SEA_MONSTER2_BATTLE = 'sea-monster2-battle',
    VICTORY_SEA_MONSTERS = 'victory-sea-monsters',
    GET_MERMAID_TEAR = 'get-mermaid-tear',
    RECEIVE_MERMAID_TEAR = 'receive-mermaid-tear',
    RESTORE_BALANCE = 'restore-balance',
    BALANCE_RESTORED = 'balance-restored',
    CHAPTER3_REWARD = 'chapter3-reward',
    DEFAULT = '',
}
export interface DialogState {
    open: boolean;
    title: string;
    text: string;
    openerId: string;
    action: DialogActionEnum;
    continue: boolean;
}

export interface SetContentsAction {
    open: boolean;
    title: string;
    text: string;
    openerId: string;
    action: DialogActionEnum;
    continue: boolean;
}
export const initialDialogState: DialogState = {
    open: false,
    title: '',
    text: '',
    openerId: '',
    action: DialogActionEnum.DEFAULT,
    continue: false,
};
const dialogSlice = createSlice({
    name: 'dialog',
    initialState: initialDialogState,
    reducers: {
        setContents(state, action: PayloadAction<SetContentsAction>) {
            state.open = action.payload.open;
            state.title = action.payload.title;
            state.text = action.payload.text;
            state.openerId = action.payload.openerId;
            state.action = action.payload.action;
            state.continue = action.payload.continue;
        },
        updateDialogState(_, action: PayloadAction<DialogState>) {
            return action.payload;
        },
    },
});

export const { setContents, updateDialogState } = dialogSlice.actions;

export default dialogSlice.reducer;
