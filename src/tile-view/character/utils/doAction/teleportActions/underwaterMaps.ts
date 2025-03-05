import {
    goToUnderwater2FromUnderwater,
    goToUnderwater2FromUnderwater3,
    goToUnderwater3FromUnderwater2,
    goToUnderwater4FromUnderwater3,
    goToUnderwaterFromUnderwater2,
} from '@/tile-view/action_utils';
import { DoActionParams } from '@/tile-view/character/types/DoActionParams';

export const hanldeTeleportationsForUnderwaterMap = ({
    character,
    map,
    setContents,
    mode,
    changeMap,
    updateNPC,
    updatePlayerPosition,
    updateCharacterState,
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
    | 'updateCharacterState'
>) => {
    const res = { success: false };

    //in front of underwater2
    if (map === 'underwater' && character.x === 7 && character.y === 0) {
        goToUnderwater2FromUnderwater(changeMap, updatePlayerPosition);
        res.success = true;
        return res;
    }
    //in front of underwater1 from underwater2
    if (map === 'underwater' && character.x === 7 && character.y === 15) {
        goToUnderwaterFromUnderwater2(changeMap, updatePlayerPosition);
        res.success = true;
        return res;
    }
    //in front of underwater3 from underwater2
    if (
        map === 'underwater2' &&
        ((character.x === 16 && character.y === 10) ||
            (character.x === 16 && character.y === 9))
    ) {
        goToUnderwater3FromUnderwater2(changeMap, updatePlayerPosition);
        res.success = true;
        return res;
    }
    //in front of underwater from underwater3
    if (map === 'underwater3' && character.x === 0 && character.y === 9) {
        goToUnderwater2FromUnderwater3(changeMap, updatePlayerPosition);
        res.success = true;
        return res;
    }
    //in front of underwater4 from underwater3
    if (map === 'underwater3' && character.x === 16 && character.y === 10) {
        goToUnderwater4FromUnderwater3(changeMap, updatePlayerPosition);
        res.success = true;
        return res;
    }
    return res;
};
