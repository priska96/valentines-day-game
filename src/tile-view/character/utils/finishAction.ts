import { initialDialogState } from '@/store/createDialogSlice';
import {
    battleEvilKing,
    enterDungeon,
    exitDungeon,
    gameOver,
    //gameWon,
    goBackToGround,
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
    receiveSword,
    seerComesOut,
    collectMermaidTear,
    receivePotion,
    goToMermaidCity,
    battleSeaMonster1,
    battleSeaMonster2,
    victorySeaMonsters,
    getMermaidTear,
    receiveMermaidTear,
    seerRestoresBalance,
    balanceRestored,
    chapter3GetReward,
    followHeroOutOfDungeon,
} from '../../action_utils';
import { FinishActionParams } from '../types/FinishActionParams';
import { HanldeActionAfterDialogParams } from '../types/HanldeActionAfterDialogParams';
import { InteractWithNPCParams } from '../types/InteractWithNPCParams';
import { InteractWithObjectParams } from '../types/InteractWithObjectParams';

export const finishAction = ({
    dialog,
    npcs,
    objectNPCs,
    character,
    setContents,
    fireActionNPC,
    onGameEnd,
    changeMap,
    updatePlayerPosition,
    updateNPC,
    updateObjectNPC,
    fireActionObjectNPC,
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
        updateObjectNPC,
        fireActionObjectNPC,
        addToInventory,
    });
    if (res.success) return;

    if (openerId.startsWith('npc-') && npcs[otherThingIdx].stopMoving) {
        finishInteractionWithNPC({
            setContents,
            npcs,
            otherThingIdx,
            fireActionNPC,
        });
    } else if (openerId.startsWith('object-')) {
        finishInteractionWithObject({
            dialog,
            setContents,
            fireActionObjectNPC,
            otherThingIdx,
            objectNPCs,
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
    updateObjectNPC,
    fireActionObjectNPC,
    addToInventory,
}: HanldeActionAfterDialogParams): { success: boolean } => {
    if (
        enterDungeon(
            dialog.action,
            setContents,
            changeMap,
            updatePlayerPosition,
            updateNPC,
            updateObjectNPC
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
            fireActionObjectNPC,
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
    } else if (followHeroOutOfDungeon(dialog.action, setContents, updateNPC)) {
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
    } else if (seerComesOut(dialog.action, setContents, updateNPC)) {
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
    } else if (battleSeaMonster1(dialog.action, 31, setContents, onGameEnd)) {
        return { success: true };
    } else if (
        battleSeaMonster2(dialog.action, otherThingIdx, setContents, onGameEnd)
    ) {
        return { success: true };
    } else if (
        victorySeaMonsters(
            dialog.action,
            otherThingIdx,
            setContents,
            onGameEnd,
            updateNPC
        )
    ) {
        return { success: true };
    } else if (getMermaidTear(dialog.action, setContents)) {
        return { success: true };
    } else if (
        receiveMermaidTear(
            dialog.action,
            setContents,
            addToInventory,
            onGameEnd,
            otherThingIdx,
            changeMap,
            updatePlayerPosition
        )
    ) {
        return { success: true };
    } else if (
        seerRestoresBalance(
            dialog.action,
            setContents,
            updateNPC,
            onGameEnd,
            otherThingIdx
        )
    ) {
        return { success: true };
    } else if (
        balanceRestored(dialog.action, otherThingIdx, setContents, onGameEnd)
    ) {
        return { success: true };
    } else if (
        chapter3GetReward(dialog.action, otherThingIdx, setContents, onGameEnd)
    ) {
        return { success: true };
    }
    return { success: false };
};

const finishInteractionWithNPC = ({
    setContents,
    npcs,
    otherThingIdx,
    fireActionNPC,
}: InteractWithNPCParams) => {
    setContents(initialDialogState);
    if (!npcs[otherThingIdx].dead) {
        fireActionNPC({ idx: otherThingIdx });
    }
};

const finishInteractionWithObject = ({
    dialog,
    setContents,
    fireActionObjectNPC,
    otherThingIdx,
    objectNPCs,
    addToInventory,
}: InteractWithObjectParams) => {
    const prevTitle = dialog.title;

    setContents(initialDialogState);
    fireActionObjectNPC({ idx: otherThingIdx });
    if (prevTitle !== 'Nothing!')
        addToInventory({ item: objectNPCs[otherThingIdx] });
};
