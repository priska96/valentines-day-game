import {
    goToForest4FromPiscesTown,
    goToHouse1,
    goPiscesTownFromHouse1,
    goToPiscesTown2,
    goToPiscesTown2From3,
    goToPiscesTown3,
    goToPiscesTownFrom2,
    goToHouse2,
    goPiscesTown2FromHouse2,
    goToHouse3,
    goPiscesTown2FromHouse3,
    goToWellInner,
} from '@/tile-view/action_utils';
import { DoActionParams } from '@/tile-view/character/types/DoActionParams';
import { GameModeEnum } from '@/tile-view/slices/statusSlice';

export const hanldeTeleportationsForPiscesTownMap = ({
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

    //in front of forest4
    if (map === 'piscesTown' && character.x === 14 && character.y === 15) {
        goToForest4FromPiscesTown(
            changeMap,
            updateNPC,
            updatePlayerPosition,
            mode
        );
        res.success = true;
        return res;
    }
    //in fornt of house1
    if (
        map.startsWith('piscesTown') &&
        character.x === 3 &&
        character.y === 7
    ) {
        goToHouse1(changeMap, updateNPC, updatePlayerPosition, mode);
        res.success = true;
        return res;
    }
    //in front of pisces town from house1
    if (
        map === 'house1' &&
        (character.x === 6 || character.x === 7) &&
        character.y === 15
    ) {
        goPiscesTownFromHouse1(
            changeMap,
            updateNPC,
            updatePlayerPosition,
            mode
        );
        res.success = true;
        return res;
    }

    //in front of pisces town2
    if (
        (map === 'piscesTown' || map === 'piscesTownMelted') &&
        character.x === 16 &&
        character.y === 7
    ) {
        goToPiscesTown2(changeMap, updateNPC, updatePlayerPosition, mode);
        res.success = true;
        return res;
    }
    //in front of pisces town2 from PT3
    if (
        (map === 'piscesTown3' || map === 'piscesTown3Melted') &&
        character.x === 8 &&
        character.y === 15
    ) {
        goToPiscesTown2From3(changeMap, updateNPC, updatePlayerPosition, mode);
        res.success = true;
        return res;
    }
    //in front of pisces town3
    if (
        (map === 'piscesTown2' || map === 'piscesTown2Melted') &&
        character.x === 8 &&
        character.y === 0
    ) {
        goToPiscesTown3(
            changeMap,
            updateNPC,
            updatePlayerPosition,
            setContents,
            mode
        );
        res.success = true;
        return res;
    }
    //in front of pisces town from PT2
    if (
        (map === 'piscesTown2' || map === 'piscesTown2Melted') &&
        character.x === 0 &&
        character.y === 7
    ) {
        goToPiscesTownFrom2(changeMap, updateNPC, updatePlayerPosition, mode);
        res.success = true;
        return res;
    }
    //in fornt of house2
    if (
        map.startsWith('piscesTown2') &&
        character.x === 3 &&
        character.y === 7
    ) {
        goToHouse2(changeMap, updateNPC, updatePlayerPosition, mode);
        res.success = true;
        return res;
    }
    //in front of pisces town2 from house2
    if (map === 'house2' && character.x === 4 && character.y === 15) {
        goPiscesTown2FromHouse2(
            changeMap,
            updateNPC,
            updatePlayerPosition,
            mode
        );
        res.success = true;
        return res;
    }
    //in front of house3
    if (
        map.startsWith('piscesTown2') &&
        character.x === 14 &&
        character.y === 14
    ) {
        goToHouse3(changeMap, updateNPC, updatePlayerPosition, mode);
        res.success = true;
        return res;
    }
    //in front of pisces town2 from house2
    if (map === 'house3' && character.x === 9 && character.y === 15) {
        goPiscesTown2FromHouse3(
            changeMap,
            updateNPC,
            updatePlayerPosition,
            mode
        );
        res.success = true;
        return res;
    }

    //in front of well
    if (
        mode === GameModeEnum.GO_TO_MERMAID_CITY &&
        map === 'piscesTown2Melted' &&
        character.inventory.find((item) => item.id === 'object-8') &&
        ((character.x === 8 && character.y === 8) ||
            (character.x === 8 && character.y === 10))
    ) {
        goToWellInner(changeMap, updatePlayerPosition, updateCharacterState);
        res.success = true;
        return res;
    }
    return res;
};
