import { DialogState, SetContentsAction } from '@/game-ui/slices/dialogSlice';
import { FireAction, NPCState } from '@/tile-view/npc/slices/npcSlice';
import { ActionCreatorWithPayload } from '@reduxjs/toolkit';
import { AddToInventoryAction } from '../slices/characterSlice';
import { ObjectState } from '@/tile-view/objectNPC/slices/objectSlice';

export type InteractWithObjectParams = {
    dialog: DialogState;
    otherThingIdx: number;
    objectNPC: ObjectState;
    setContents: ActionCreatorWithPayload<
        SetContentsAction,
        'dialog/setContents'
    >;
    fireActionObject: ActionCreatorWithPayload<
        FireAction,
        'objectNPC/fireAction'
    >;
    addToInventory: ActionCreatorWithPayload<
        AddToInventoryAction,
        'character/addToInventory'
    >;
};
