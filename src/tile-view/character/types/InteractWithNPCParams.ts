import { FireActionPayloadNPC, NPC, SetContentsPayload } from '@/store/types';

export type InteractWithNPCParams = {
    otherThingIdx: number;
    setContents: (payload: SetContentsPayload) => void;
    fireActionNPC: (payload: FireActionPayloadNPC) => void;
    npcs: NPC[];
};
