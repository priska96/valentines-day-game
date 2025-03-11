import {
    AddToInventoryPayloadChar,
    FireActionObjectNPCPayload,
    ObjectNPC,
    SetContentsPayload,
    DialogState,
} from '@/store/types';

export type InteractWithObjectParams = {
    dialog: DialogState;
    otherThingIdx: number;
    objectNPCs: ObjectNPC[];
    setContents: (payload: SetContentsPayload) => void;
    fireActionObjectNPC: (payload: FireActionObjectNPCPayload) => void;
    addToInventory: (payload: AddToInventoryPayloadChar) => void;
};
