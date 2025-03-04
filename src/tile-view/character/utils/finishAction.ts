import {
    battleEvilKing,
    enterDungeon,
    exitDungeon,
    gameOver,
    //gameWon,
    goBackToGround,
    goToForest2,
    goToForest3,
    goToForest4,
    goToPiscesTown,
    goToPiscesTown2,
    goToPiscesTown3,
    goToPiscesTownFrom2,
    goToSky,
    leaveDungeon,
    victory,
    beforeBattleEvilQueen,
    beforeBattleEvilQueen2,
    battleEvilQueen,
    gameWonEvilQueen,
    gameOverEvilQueen,
    victoryEvilQueen,
    spellBroken,
    getReward,
    followHeroHome,
    goToForest,
    goToForest2From3,
    goToForest3From4,
    goToForest4FromPiscesTown,
    goToPiscesTown2From3,
    receiveSword,
    seerComesOut,
    collectMermaidTear,
    receivePotion,
    goToHouse2,
    goPiscesTown2FromHouse2,
    goToHouse3,
    goPiscesTown2FromHouse3,
    goToHouse1,
    goPiscesTownFromHouse1,
    goToMermaidCity,
    goToWellInner,
} from '../../action_utils';
import { dialogs } from '../../dialog_utils';
import { fullyGeared, whoIsOnMap } from '../../utils';
import {
    ObjectNPC,
    ObjectState,
    UpdateObjectAction,
} from '../../objectNPC/slices/objectSlice';
import {
    AddToInventoryAction,
    CharacterState,
    UpdatePlayerPositionAction,
} from '../slices/characterSlice';
import {
    FireAction,
    NPC,
    NPCState,
    UpdateNPCAction,
} from '../../npc/slices/npcSlice';
import {
    DialogActionEnum,
    DialogState,
    initialDialogState,
    SetContentsAction,
} from '../../../game-ui/slices/dialogSlice';
import { ActionCreatorWithPayload } from '@reduxjs/toolkit';
import { GameModeEnum, OnGameEndAction } from '../../slices/statusSlice';
import { FinishActionParams } from '../types/FinishActionParams';
import { HanldeActionAfterDialogParams } from '../types/HanldeActionAfterDialogParams';
import { InteractWithNPCParams } from '../types/InteractWithNPCParams';
import { InteractWithObjectParams } from '../types/InteractWithObjectParams';
import { DoActionParams } from '../types/DoActionParams';

export const finishAction = ({
    dialog,
    npc,
    objectNPC,
    character,
    setContents,
    fireAction,
    onGameEnd,
    changeMap,
    updatePlayerPosition,
    updateNPC,
    updateObject,
    fireActionObject,
    addToInventory,
}: FinishActionParams) => {
    const openerId = dialog.openerId;
    const otherThingIdx = parseInt(openerId.split('-')[1]);

    const res = handleActionAfterDialogDone({
        dialog,
        character,
        otherThingIdx,
        setContents,
        onGameEnd,
        changeMap,
        updatePlayerPosition,
        updateNPC,
        updateObject,
        fireActionObject,
        addToInventory,
    });
    if (res.success) return;

    if (openerId.startsWith('npc-') && npc.npcs[otherThingIdx].stopMoving) {
        finishInteractionWithNPC({
            setContents,
            npc,
            otherThingIdx,
            fireAction,
        });
    } else if (openerId.startsWith('object-')) {
        finishInteractionWithObject({
            dialog,
            setContents,
            fireActionObject,
            otherThingIdx,
            objectNPC,
            addToInventory,
        });
    } else {
        setContents(initialDialogState);
    }
};

export const handleActionAfterDialogDone = ({
    dialog,
    character,
    otherThingIdx,
    setContents,
    changeMap,
    onGameEnd,
    updatePlayerPosition,
    updateNPC,
    updateObject,
    fireActionObject,
    addToInventory,
}: HanldeActionAfterDialogParams): { success: boolean } => {
    if (
        enterDungeon(
            dialog.action,
            setContents,
            changeMap,
            updatePlayerPosition,
            updateNPC,
            updateObject
        )
    ) {
        return { success: true };
    } else if (
        goToSky(
            dialog.action,
            setContents,
            changeMap,
            updatePlayerPosition,
            updateNPC
        )
    ) {
        return { success: true };
    } else if (
        battleEvilKing(dialog.action, otherThingIdx, setContents, onGameEnd)
    ) {
        return { success: true };
    } else if (gameOver(dialog.action, otherThingIdx, setContents, onGameEnd)) {
        return { success: true };
    } else if (
        victory(
            dialog.action,
            otherThingIdx,
            setContents,
            fireActionObject,
            updateNPC,
            onGameEnd
        )
    ) {
        return { success: true };
    } else if (
        leaveDungeon(
            dialog.action,
            setContents,
            changeMap,
            updatePlayerPosition,
            updateNPC,
            onGameEnd
        )
    ) {
        return { success: true };
    } else if (
        exitDungeon(
            dialog.action,
            setContents,
            changeMap,
            updatePlayerPosition,
            updateNPC
        )
    ) {
        return { success: true };
    } else if (
        goBackToGround(
            dialog.action,
            setContents,
            changeMap,
            updatePlayerPosition,
            updateNPC,
            onGameEnd
        )
    ) {
        return { success: true };
    } else if (
        followHeroHome(dialog.action, setContents, updateNPC, character)
    ) {
        return { success: true };
    } else if (beforeBattleEvilQueen(dialog.action, setContents, updateNPC)) {
        return { success: true };
    } else if (beforeBattleEvilQueen2(dialog.action, setContents, updateNPC)) {
        return { success: true };
    } else if (
        battleEvilQueen(dialog.action, otherThingIdx, setContents, onGameEnd)
    ) {
        return { success: true };
    } else if (
        gameOverEvilQueen(dialog.action, otherThingIdx, setContents, onGameEnd)
    ) {
        return { success: true };
    } else if (
        victoryEvilQueen(
            dialog.action,
            otherThingIdx,
            setContents,
            updateNPC,
            onGameEnd
        )
    ) {
        return { success: true };
    } else if (
        gameWonEvilQueen(dialog.action, otherThingIdx, setContents, onGameEnd)
    ) {
        return { success: true };
    } else if (getReward(dialog.action, setContents)) {
        return { success: true };
    } else if (
        receiveSword(
            dialog.action,
            setContents,
            addToInventory,
            onGameEnd,
            otherThingIdx
        )
    ) {
        return { success: true };
    } else if (spellBroken(dialog.action, setContents, changeMap, updateNPC)) {
        return { success: true };
    } else if (
        seerComesOut(
            dialog.action,
            setContents,
            updateNPC,
            onGameEnd,
            otherThingIdx
        )
    ) {
        return { success: true };
    } else if (
        collectMermaidTear(
            dialog.action,
            setContents,
            updateNPC,
            onGameEnd,
            otherThingIdx
        )
    ) {
        return { success: true };
    } else if (receivePotion(dialog.action, setContents, addToInventory)) {
        return { success: true };
    } else if (
        goToMermaidCity(dialog.action, setContents, onGameEnd, otherThingIdx)
    ) {
        return { success: true };
    }
    return { success: false };
};

const finishInteractionWithNPC = ({
    setContents,
    npc,
    otherThingIdx,
    fireAction,
}: InteractWithNPCParams) => {
    setContents(initialDialogState);
    if (!npc.npcs[otherThingIdx].dead) {
        fireAction({ idx: otherThingIdx });
    }
};

const finishInteractionWithObject = ({
    dialog,
    setContents,
    fireActionObject,
    otherThingIdx,
    objectNPC,
    addToInventory,
}: InteractWithObjectParams) => {
    const prevTitle = dialog.title;

    setContents(initialDialogState);
    fireActionObject({ idx: otherThingIdx });
    if (prevTitle !== 'Nothing!')
        addToInventory({ item: objectNPC.objects[otherThingIdx] });
};
