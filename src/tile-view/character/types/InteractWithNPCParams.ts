import { SetContentsAction } from '@/game-ui/slices/dialogSlice';
import { FireAction, NPCState } from '@/tile-view/npc/slices/npcSlice';
import { ActionCreatorWithPayload } from '@reduxjs/toolkit';

export type InteractWithNPCParams = {
    otherThingIdx: number;
    setContents: ActionCreatorWithPayload<
        SetContentsAction,
        'dialog/setContents'
    >;
    fireAction: ActionCreatorWithPayload<FireAction, 'npc/fireAction'>;
    npc: NPCState;
};
