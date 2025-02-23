import { wildFightOpts } from '@/constants';
import { OnGameEndAction } from '@/tile-view/slices/statusSlice';
import { ActionCreatorWithPayload } from '@reduxjs/toolkit';
import { finishAction, doAction } from '../dialogActions';
import { DialogState, SetContentsAction } from '@/game-ui/slices/dialogSlice';
import {
    FireAction,
    MoveAction,
    NPCState,
    UpdateNPCAction,
} from '@/tile-view/npc/slices/npcSlice';
import {
    ObjectState,
    UpdateObjectAction,
} from '@/tile-view/objectNPC/slices/objectSlice';
import {
    AddToInventoryAction,
    CharacterState,
    UpdatePlayerPositionAction,
} from '../slices/characterSlice';

/**
 * Handles game end conditions based on character position.
 * @param newX - The new x-coordinate of the character.
 * @param newY - The new y-coordinate of the character.
 * @param map - The current map.
 * @param onGameEnd - Function to handle game end.
 */
export const handleGameEndConditions = (
    newX: number,
    newY: number,
    map: string,
    onGameEnd: ActionCreatorWithPayload<OnGameEndAction, 'gameStatus/onGameEnd'>
) => {
    if (
        map === 'forest2' &&
        ((newX === 2 && newY === 8) || (newX === 6 && newY === 12))
    ) {
        onGameEnd({
            mode: 'game-over-hole',
            winner: undefined,
            selectedOpponentIdx: 0,
        });
    }
};

/**
 * Handles wild fight initiation based on map and mode.
 * @param map - The current map.
 * @param mode - The current mode.
 * @param setContents - Function to set dialog contents.
 * @param onGameEnd - Function to handle game end.
 */
export const handleWildFight = (
    map: string,
    mode: string | undefined,
    setContents: ActionCreatorWithPayload<
        SetContentsAction,
        'dialog/setContents'
    >,
    onGameEnd: ActionCreatorWithPayload<OnGameEndAction, 'gameStatus/onGameEnd'>
) => {
    if ((map === 'forest2' || map === 'forest3') && mode !== 'battle') {
        if (wildFightOpts[Math.floor(Math.random() * wildFightOpts.length)]) {
            const opponent = [7, 8, 9];

            setContents({
                open: true,
                title: 'Warning!!',
                text: 'A wild monster attacked you!',
                openerId: '',
                action: '',
            });
            setTimeout(() => {
                setContents({
                    open: false,
                    title: '',
                    text: '',
                    openerId: '',
                    action: '',
                });
                onGameEnd({
                    mode: 'battle',
                    winner: undefined,
                    selectedOpponentIdx:
                        opponent[Math.floor(Math.random() * opponent.length)],
                });
            }, 3500);
        }
    }
};

/**
 * Handles NPC following the character.
 * @param xDir - The x-direction of the movement.
 * @param yDir - The y-direction of the movement.
 * @param key - The key pressed for movement.
 * @param npc - The NPC state.
 * @param moveNPC - Function to move NPC.
 */
export const handleNPCFollow = (
    xDir: number,
    yDir: number,
    key: string,
    npc: NPCState,
    moveNPC: ActionCreatorWithPayload<MoveAction, 'npc/move'>
) => {
    if (npc.npcs.some((n) => n.followHero)) {
        npc.npcs.forEach((n, idx) => {
            if (n.followHero) {
                moveNPC({ x: xDir, y: yDir, dirKey: key, idx });
            }
        });
    }
};

/**
 * Handles dialog actions based on the current state.
 * @param dialog - The dialog state.
 * @param npc - The NPC state.
 * @param objectNPC - The object NPC state.
 * @param character - The character state.
 * @param map - The current map.
 * @param winner - The winner of the game.
 * @param mode - The current mode.
 * @param setContents - Function to set dialog contents.
 * @param fireAction - Function to fire action.
 * @param onGameEnd - Function to handle game end.
 * @param changeMap - Function to change map.
 * @param updatePlayerPosition - Function to update player position.
 * @param updateNPC - Function to update NPC.
 * @param updateObject - Function to update object.
 * @param fireActionObject - Function to fire action on object.
 * @param addToInventory - Function to add to inventory.
 */
export const handleDialogAction = (
    dialog: DialogState,
    npc: NPCState,
    objectNPC: ObjectState,
    character: CharacterState,
    map: string,
    winner: string | undefined,
    mode: string | undefined,
    setContents: ActionCreatorWithPayload<
        SetContentsAction,
        'dialog/setContents'
    >,
    fireAction: ActionCreatorWithPayload<FireAction, 'npc/fireAction'>,
    onGameEnd: ActionCreatorWithPayload<
        OnGameEndAction,
        'gameStatus/onGameEnd'
    >,
    changeMap: ActionCreatorWithPayload<string, 'gameStatus/changeMap'>,
    updatePlayerPosition: ActionCreatorWithPayload<
        UpdatePlayerPositionAction,
        'character/updatePlayerPosition'
    >,
    updateNPC: ActionCreatorWithPayload<UpdateNPCAction, 'npc/updateNPC'>,
    updateObject: ActionCreatorWithPayload<
        UpdateObjectAction,
        'objectNPC/updateObject'
    >,
    fireActionObject: ActionCreatorWithPayload<
        FireAction,
        'objectNPC/fireAction'
    >,
    addToInventory: ActionCreatorWithPayload<
        AddToInventoryAction,
        'character/addToInventory'
    >
) => {
    if (dialog.open) {
        finishAction(
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
            addToInventory
        );
    } else {
        doAction(
            map,
            character,
            npc,
            objectNPC,
            winner,
            mode,
            setContents,
            fireAction,
            onGameEnd,
            changeMap,
            updatePlayerPosition,
            updateNPC
        );
    }
};
