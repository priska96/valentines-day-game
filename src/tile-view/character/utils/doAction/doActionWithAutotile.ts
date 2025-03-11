import { DoActionParams } from '../../types/DoActionParams';
import { NPC, Autotile, ObjectNPC } from '@/store/types';
import { GameModeEnum } from '@/store/enums';

export const doActionWithAutotile = ({
    otherThing,
    map,
    mode,
    onGameEnd,
    updatePlayerPosition,
    character,
    changeMap,
}: { otherThing: ObjectNPC | NPC | Autotile } & Pick<
    DoActionParams,
    | 'setContents'
    | 'fireActionNPC'
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
                    }, 3500);

                    const underwaterPotion = character.inventory.filter(
                        (item) => item.id === 'object-8'
                    );
                    if (
                        underwaterPotion &&
                        underwaterPotion.length > 0 &&
                        !underwaterPotion[0].inUse
                    ) {
                        setTimeout(() => {
                            onGameEnd({
                                mode: GameModeEnum.GAME_OVER_UNDERWATER,
                                winner: undefined,
                                selectedOpponentIdx: otherThingIdx,
                            });
                        }, 9000);
                    }
                    res.success = true;
                    return res;
                }
            }
        }
    }
    return res;
};
