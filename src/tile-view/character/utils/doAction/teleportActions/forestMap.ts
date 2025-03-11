import { DoActionParams } from '../../../types/DoActionParams';
import { dialogs } from '@/tile-view/dialog_utils';
import {
    leaveDungeon,
    goToForest2,
    goToForest,
    goToForest3,
    goToForest2From3,
    goToForest3From4,
    goToForest4,
    goToPiscesTown,
} from '@/tile-view/action_utils';
import { DialogActionEnum, GameModeEnum } from '@/store/enums';
import { SetContentsPayload } from '@/store/types';

export const hanldeTeleportationsForForestMap = ({
    character,
    map,
    setContents,
    mode,
    changeMap,
    updateNPC,
    updatePlayerPosition,
    onGameEnd,
}: Pick<
    DoActionParams,
    | 'character'
    | 'mode'
    | 'map'
    | 'setContents'
    | 'changeMap'
    | 'updateNPC'
    | 'updatePlayerPosition'
    | 'onGameEnd'
>) => {
    const res = { success: false };
    //in front of dungeon entrance
    if (map === 'sky' && character.x === 5 && character.y === 7) {
        setContents(
            (dialogs.sky['npc-0'].enterDungeon.content as SetContentsPayload) ??
                ({} as SetContentsPayload)
        );
        res.success = true;
        return res;
    }
    //in front of dungeon exit
    if (map === 'evilKing' && character.x === 12 && character.y === 14) {
        setContents(
            (dialogs.evilKing['npc-2'].exitDungeon
                .content as SetContentsPayload) ?? ({} as SetContentsPayload)
        );
        res.success = true;
        return res;
    }
    //in front of dungeon exit2
    if (map === 'dungeonPath' && character.x === 12 && character.y === 14) {
        if (
            leaveDungeon(
                DialogActionEnum.LEAVE_DUNGEON,
                setContents,
                changeMap,
                updatePlayerPosition,
                updateNPC,
                onGameEnd
            )
        ) {
            res.success = true;
            return res;
        }
        return res;
    }
    //in front of forest2
    if (map === 'forest' && character.x === 15 && character.y === 15) {
        goToForest2(changeMap, updateNPC, updatePlayerPosition, mode);
        res.success = true;
        return res;
    }
    //in front of forestFrom2
    if (map === 'forest2' && character.x === 15 && character.y === 0) {
        goToForest(changeMap, updateNPC, updatePlayerPosition);
        res.success = true;
        return res;
    }
    //read woodenBoard
    if (
        map === 'forest2' &&
        ((character.x === 3 && character.y === 5) ||
            (character.x === 2 && character.y === 4) ||
            (character.x === 4 && character.y === 4))
    ) {
        if (mode === GameModeEnum.NEW_CHAPTER) {
            setContents(
                (dialogs.forest2.woodenBoard.readBoard
                    .content as SetContentsPayload) ??
                    ({} as SetContentsPayload)
            );
        } else {
            setContents(
                (dialogs.forest2.woodenBoard2.readBoard
                    .content as SetContentsPayload) ??
                    ({} as SetContentsPayload)
            );
        }
        res.success = false;
        return res;
    }
    //in front of forest3
    if (map === 'forest2' && character.x === 5 && character.y === 15) {
        goToForest3(changeMap, updateNPC, updatePlayerPosition, mode);
        res.success = true;
        return res;
    }
    //in front of forest2from3
    if (map === 'forest3' && character.x === 15 && character.y === 0) {
        goToForest2From3(changeMap, updateNPC, updatePlayerPosition, mode);
        res.success = true;
        return res;
    }
    //in front of forest3from4
    if (map === 'forest4' && character.x === 0 && character.y === 10) {
        goToForest3From4(changeMap, updateNPC, updatePlayerPosition, mode);
        res.success = true;
        return res;
    }
    //in front of forest4
    if (map === 'forest3' && character.x === 16 && character.y === 10) {
        goToForest4(changeMap, updateNPC, updatePlayerPosition, mode);
        res.success = true;
        return res;
    }
    //in front of pisces town
    if (map === 'forest4' && character.x === 15 && character.y === 0) {
        goToPiscesTown(
            changeMap,
            updateNPC,
            updatePlayerPosition,
            setContents,
            mode
        );
        res.success = true;
        return res;
    }
    return res;
};
