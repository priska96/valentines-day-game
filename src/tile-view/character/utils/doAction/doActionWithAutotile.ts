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
}: { otherThing: ObjectNPC | NPC | Autotile } & Pick<
    DoActionParams,
    | 'setContents'
    | 'fireAction'
    | 'map'
    | 'mode'
    | 'winner'
    | 'character'
    | 'onGameEnd'
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
                    res.success = true;
                    return res;
                }
            }
        }
    }
    return res;
};
