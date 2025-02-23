import { SetContentsAction } from '@/game-ui/slices/dialogSlice';
import {
    NPCState,
    FireAction,
    UpdateNPCAction,
} from '@/tile-view/npc/slices/npcSlice';
import { ObjectState } from '@/tile-view/objectNPC/slices/objectSlice';
import { OnGameEndAction } from '@/tile-view/slices/statusSlice';
import { ActionCreatorWithPayload } from '@reduxjs/toolkit';
import {
    CharacterState,
    UpdatePlayerPositionAction,
} from '../slices/characterSlice';

export type DoActionParams = {
    map: string;
    character: CharacterState;
    npc: NPCState;
    objectNPC: ObjectState;
    winner: string | undefined;
    mode: string | undefined;
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
};
