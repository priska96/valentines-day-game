import {
    AddToInventoryPayloadChar,
    CharacterState,
    FireActionPayloadNPC,
    NPC,
    OnGameEndPayload,
    UpdateNPCPayload,
    UpdatePlayerPositionPayloadChar,
    ObjectNPC,
    UpdateObjectNPCPayload,
    FireActionObjectNPCPayload,
    SetContentsPayload,
    DialogState,
} from '@/store/types';

export type FinishActionParams = {
    dialog: DialogState;
    npcs: NPC[];
    objectNPCs: ObjectNPC[];
    character: CharacterState;
    setContents: (payload: SetContentsPayload) => void;
    fireActionNPC: (payload: FireActionPayloadNPC) => void;
    onGameEnd: (payload: OnGameEndPayload) => void;
    changeMap: (map: string) => void;
    updatePlayerPosition: (payload: UpdatePlayerPositionPayloadChar) => void;
    updateNPC: (payload: UpdateNPCPayload) => void;
    updateObjectNPC: (payload: UpdateObjectNPCPayload) => void;
    fireActionObjectNPC: (payload: FireActionObjectNPCPayload) => void;
    addToInventory: (payload: AddToInventoryPayloadChar) => void;
};
