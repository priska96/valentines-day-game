import { DialogState, SetContentsAction } from '@/game-ui/slices/dialogSlice';
import {
    NPCState,
    FireAction,
    UpdateNPCAction,
} from '@/tile-view/npc/slices/npcSlice';
import {
    ObjectState,
    UpdateObjectAction,
} from '@/tile-view/objectNPC/slices/objectSlice';
import { OnGameEndAction } from '@/tile-view/slices/statusSlice';
import { ActionCreatorWithPayload } from '@reduxjs/toolkit';
import {
    CharacterState,
    UpdatePlayerPositionAction,
    AddToInventoryAction,
} from '../slices/characterSlice';

export type HanldeActionAfterDialogParams = {
    dialog: DialogState;
    character: CharacterState;
    otherThingIdx: number;
    setContents: ActionCreatorWithPayload<
        SetContentsAction,
        'dialog/setContents'
    >;
    onGameEnd: ActionCreatorWithPayload<
        OnGameEndAction,
        'gameStatus/onGameEnd'
    >;
    changeMap: ActionCreatorWithPayload<string, 'gameStatus/changeMap'>;
    updatePlayerPosition: ActionCreatorWithPayload<
        UpdatePlayerPositionAction,
        'character/updatePlayerPosition'
    >;
    updateNPC: ActionCreatorWithPayload<UpdateNPCAction, 'npc/updateNPC'>;
    updateObject: ActionCreatorWithPayload<
        UpdateObjectAction,
        'objectNPC/updateObject'
    >;
    fireActionObject: ActionCreatorWithPayload<
        FireAction,
        'objectNPC/fireAction'
    >;
};
