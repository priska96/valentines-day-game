import { whoIsOnMap } from '../../../utils';
import { DoActionParams } from '../../types/DoActionParams';
import { hanldeTeleportationsForForestMap } from './teleportActions/forestMap';
import { doActionWithNPC } from './doActionWithNPC';
import { doActionWithOpbjectNPC } from './doActionWithObjectNPC';
import { hanldeTeleportationsForPiscesTownMap } from './teleportActions/piscesTownMap';
import { doActionWithAutotile } from './doActionWithAutotile';
import { hanldeTeleportationsForUnderwaterMap } from './teleportActions/underwaterMaps';

export const doAction = ({
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
}: DoActionParams) => {
    const otherThing = whoIsOnMap(
        character.x,
        character.y,
        character.dir,
        [...npcs, ...objectNPCs, ...autotiles],
        map
    );

    if (!otherThing) {
        const res = hanldeTeleportationsForForestMap({
            character,
            map,
            setContents,
            updateNPC,
            updatePlayerPosition,
            changeMap,
            mode,
            onGameEnd,
        });
        if (res.success) return;
        const res1 = hanldeTeleportationsForPiscesTownMap({
            character,
            map,
            setContents,
            updateNPC,
            updatePlayerPosition,
            changeMap,
            mode,
            onGameEnd,
            updateCharacterState,
        });

        if (res1.success) return;
        const res2 = hanldeTeleportationsForUnderwaterMap({
            character,
            map,
            setContents,
            updateNPC,
            updatePlayerPosition,
            changeMap,
            mode,
            onGameEnd,
            updateCharacterState,
        });

        if (res2.success) return;
        return;
    }

    // INTERACT WITH OTHERS
    const res2 = doActionWithNPC({
        otherThing,
        setContents,
        fireActionNPC,
        map,
        mode,
        winner,
        character,
        onGameEnd,
    });
    if (res2.success) {
        return;
    }
    const res3 = doActionWithOpbjectNPC({ otherThing, setContents });
    if (res3.success) {
        return;
    }
    const res4 = doActionWithAutotile({
        otherThing,
        setContents,
        fireActionNPC,
        map,
        mode,
        winner,
        character,
        onGameEnd,
        updatePlayerPosition,
        changeMap,
    });
    if (res4.success) {
        return;
    }
};
