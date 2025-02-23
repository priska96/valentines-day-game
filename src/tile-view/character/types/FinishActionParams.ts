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

export type FinishActionParams = {
    dialog: DialogState;
    npc: NPCState;
    objectNPC: ObjectState;
    character: CharacterState;
    setContents: ActionCreatorWithPayload<
        SetContentsAction,
        'dialog/setContents'
    >;
    fireAction: ActionCreatorWithPayload<FireAction, 'npc/fireAction'>;
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
    addToInventory: ActionCreatorWithPayload<
        AddToInventoryAction,
        'character/addToInventory'
    >;
};
