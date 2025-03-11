import { wildFightOpts } from '@/constants';
import { finishAction } from './finishAction';

import { TILE_SIZE } from '@/tile-view/maps/mapData';
import { Sprite } from 'konva/lib/shapes/Sprite';
import { doAction } from './doAction/doAction';
import {
    Autotile,
    AddToInventoryPayloadChar,
    CharacterState,
    NPC,
    UpdatePlayerPositionPayloadChar,
    UpdateNPCPayload,
    OnGameEndPayload,
    MoveNPCPayload,
    FireActionPayloadNPC,
    ObjectNPC,
    FireActionObjectNPCPayload,
    UpdateObjectNPCPayload,
    DialogState,
    SetContentsPayload,
} from '@/store/types';
import { initialDialogState } from '@/store/createDialogSlice';
import { DialogActionEnum, GameModeEnum } from '@/store/enums';

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
    onGameEnd: (payload: OnGameEndPayload) => void
) => {
    if (
        map === 'forest2' &&
        ((newX === 2 && newY === 8) || (newX === 6 && newY === 12))
    ) {
        onGameEnd({
            mode: GameModeEnum.GAME_OVER_HOLE,
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
    setContents: (payload: SetContentsPayload) => void,
    onGameEnd: (payload: OnGameEndPayload) => void
) => {
    if ((map === 'forest2' || map === 'forest3') && mode !== 'battle') {
        if (wildFightOpts[Math.floor(Math.random() * wildFightOpts.length)]) {
            const opponent = [7, 8, 9];

            setContents({
                open: true,
                title: 'Warning!!',
                text: 'A wild monster attacked you!',
                openerId: '',
                action: DialogActionEnum.DEFAULT,
            });
            setTimeout(() => {
                setContents(initialDialogState);
                onGameEnd({
                    mode: GameModeEnum.BATTLE,
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
    npcs: NPC[],
    moveNPC: (payload: MoveNPCPayload) => void
) => {
    if (npcs.some((n) => n.followHero)) {
        npcs.forEach((n, idx) => {
            if (n.followHero) {
                moveNPC({ x: xDir - n.x, y: yDir - n.y, dirKey: key, idx });
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
    npcs: NPC[],
    objectNPCs: ObjectNPC[],
    autotiles: Autotile[],
    character: CharacterState,
    map: string,
    winner: string | undefined,
    mode: GameModeEnum | undefined,

    setContents: (payload: SetContentsPayload) => void,
    fireActionNPC: (payload: FireActionPayloadNPC) => void,

    onGameEnd: (payload: OnGameEndPayload) => void,
    changeMap: (map: string) => void,

    updatePlayerPosition: (payload: UpdatePlayerPositionPayloadChar) => void,
    updateNPC: (payload: UpdateNPCPayload) => void,
    updateObjectNPC: (payload: UpdateObjectNPCPayload) => void,
    fireActionObjectNPC: (payload: FireActionObjectNPCPayload) => void,
    addToInventory: (payload: AddToInventoryPayloadChar) => void,
    updateCharacterState: (updates: Partial<CharacterState>) => void
) => {
    if (dialog.open) {
        finishAction({
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
        });
    } else {
        doAction({
            map,
            character,
            npcs,
            objectNPCs,
            autotiles,
            winner,
            mode,
            setContents,
            fireActionNPC,
            onGameEnd,
            changeMap,
            updatePlayerPosition,
            updateNPC,
            updateCharacterState,
        });
    }
};

interface AnimateProps {
    spriteRef: React.RefObject<Sprite | null>;
    animate: string;
    updateCharacterState: (updates: Partial<CharacterState>) => void;
}

export const animateFallIntoWell = ({
    spriteRef,
    animate,
    updateCharacterState,
}: AnimateProps) => {
    if (spriteRef && spriteRef.current && animate === 'fall-into-well') {
        const ref = spriteRef.current;
        spriteRef.current.to({
            x: 8 * TILE_SIZE,
            y: 10 * TILE_SIZE,
            duration: 1,
            onUpdate: () => {
                spriteRef.current!.rotate(45);
            },
            onFinish: () => {
                setTimeout(() => {
                    spriteRef.current!.rotate(-ref.rotation());
                    updateCharacterState({ animate: '', x: 8, y: 10 });
                }, 200);
            },
        });
    }
};
