import { ObjectNPC } from '@/tile-view/objectNPC/slices/objectSlice';
import { DoActionParams } from '../../types/DoActionParams';
import { NPC } from '@/tile-view/npc/slices/npcSlice';
import { Autotile } from '@/tile-view/autotile/slices/autotileSlice';
import { GameModeEnum } from '@/tile-view/slices/statusSlice';

export const doActionWithAutotile = ({
    otherThing,
    setContents,
    fireAction,
    map,
    mode,
    winner,
    character,
    onGameEnd,
    updatePlayerPosition,
    changeMap,
}: { otherThing: ObjectNPC | NPC | Autotile } & Pick<
    DoActionParams,
    | 'setContents'
    | 'fireAction'
    | 'map'
    | 'mode'
    | 'winner'
    | 'character'
    | 'onGameEnd'
    | 'updatePlayerPosition'
    | 'changeMap'
>) => {
    const res = { success: false };
    if (otherThing.type === 'autotile') {
        const otherThingIdx = parseInt(otherThing.id.split('-')[1]);
        if (map === 'wellInner') {
            if (mode === GameModeEnum.GO_TO_MERMAID_CITY) {
                // whirlpool
                if (otherThingIdx === 0) {
                    onGameEnd({
                        mode: GameModeEnum.WHIRLPOOL,
                        winner: undefined,
                        selectedOpponentIdx: otherThingIdx,
                    });
                    setTimeout(() => {
                        changeMap('underwater');

                        updatePlayerPosition({ x: 7, y: 12, step: 0, dir: 3 });
                    }, 3000);
                    res.success = true;
                    return res;
                }
            }
        }
    }
    return res;
};
