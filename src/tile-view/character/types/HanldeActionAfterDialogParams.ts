import {
    AddToInventoryPayloadChar,
    CharacterState,
    FireActionObjectNPCPayload,
    OnGameEndPayload,
    UpdateNPCPayload,
    UpdateObjectNPCPayload,
    UpdatePlayerPositionPayloadChar,
    DialogState,
    SetContentsPayload,
} from '@/store/types';

export type HanldeActionAfterDialogParams = {
    dialog: DialogState;
    character: CharacterState;
    otherThingIdx: number;
    setContents: (payload: SetContentsPayload) => void;
    onGameEnd: (payload: OnGameEndPayload) => void;
    changeMap: (map: string) => void;
    updatePlayerPosition: (payload: UpdatePlayerPositionPayloadChar) => void;
    updateNPC: (payload: UpdateNPCPayload) => void;
    updateObjectNPC: (payload: UpdateObjectNPCPayload) => void;
    fireActionObjectNPC: (payload: FireActionObjectNPCPayload) => void;
    addToInventory: (payload: AddToInventoryPayloadChar) => void;
};
