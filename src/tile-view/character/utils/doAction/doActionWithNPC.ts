import { dialogs, NestedDialog } from '@/tile-view/dialog_utils';
import { GameModeEnum } from '@/store/enums';
import { fullyGeared } from '@/tile-view/utils';
import { DoActionParams } from '../../types/DoActionParams';
import { Autotile, NPC, ObjectNPC, SetContentsPayload } from '@/store/types';

export const doActionWithNPC = ({
    otherThing,
    setContents,
    fireActionNPC,
    map,
    mode,
    winner,
    character,
    onGameEnd,
}: { otherThing: ObjectNPC | NPC | Autotile } & Pick<
    DoActionParams,
    | 'setContents'
    | 'fireActionNPC'
    | 'map'
    | 'mode'
    | 'winner'
    | 'character'
    | 'onGameEnd'
>) => {
    const res = { success: false };
    if (otherThing.type === 'npc') {
        const otherThingIdx = parseInt(otherThing.id.split('-')[1]);
        if (!(otherThing as NPC).dead) {
            fireActionNPC({ idx: otherThingIdx });
        }
        if (map === 'forest') {
            if (mode === GameModeEnum.NEW_CHAPTER) {
                setContents(
                    (dialogs.forest[otherThing.id].travelHome
                        .content as SetContentsPayload) ??
                        ({} as SetContentsPayload)
                );
                res.success = true;
                return res;
            }
            if (mode === GameModeEnum.WORLD) {
                if (fullyGeared(character.inventory) === 3) {
                    if (winner === undefined || winner === 'Blue Dragon') {
                        setContents(
                            (
                                dialogs.forest[otherThing.id].beforeFight
                                    .afterGear as NestedDialog
                            ).content as SetContentsPayload
                        );
                        setTimeout(() => {
                            onGameEnd({
                                mode: GameModeEnum.BATTLE,
                                winner: undefined,
                                selectedOpponentIdx: otherThingIdx,
                            });
                        }, 500);
                        res.success = true;
                        return res;
                    }
                    if (winner === 'Jihoon') {
                        setContents(
                            (
                                dialogs.forest[otherThing.id].afterFight
                                    .goToSky as NestedDialog
                            ).content as SetContentsPayload
                        );
                        res.success = true;
                        return res;
                    }
                } else {
                    setContents(
                        (
                            dialogs.forest[otherThing.id].beforeFight
                                .beforeGear as NestedDialog
                        ).content as SetContentsPayload
                    );
                    res.success = true;
                    return res;
                }
            }
        }
        if (map === 'evilKing') {
            setContents(
                (dialogs.evilKing[otherThing.id].afterVictory
                    .content as SetContentsPayload) ??
                    ({} as SetContentsPayload)
            );
            res.success = true;
            return res;
        }
        if (map === 'skyBroken') {
            setContents(
                (dialogs.skyBroken[otherThing.id].goBackToForest
                    .content as SetContentsPayload) ??
                    ({} as SetContentsPayload)
            );
            res.success = true;
            return res;
        }
        if (map === 'piscesTown3' && mode === GameModeEnum.VICTORY_EVIL_QUEEN) {
            setContents(
                (dialogs.piscesTown[otherThing.id].afterVictory
                    .content as SetContentsPayload) ??
                    ({} as SetContentsPayload)
            );
            res.success = true;
            return res;
        }
        if (
            [
                'piscesTownMelted',
                'piscesTown2Melted',
                'piscesTown3Melted',
                'house1',
                'house2',
                'house3',
            ].includes(map) &&
            mode === GameModeEnum.SPELL_BROKEN
        ) {
            setContents(
                (dialogs.piscesTownMelted[otherThing.id].afterSpell
                    .content as SetContentsPayload) ??
                    ({} as SetContentsPayload)
            );
            res.success = true;
            return res;
        }
        if (
            [
                'piscesTownMelted',
                'piscesTown2Melted',
                'piscesTown3Melted',
                'house1',
                'house2',
                'house3',
            ].includes(map) &&
            mode === GameModeEnum.CHAPTER3
        ) {
            setContents(
                (dialogs.piscesTownMelted[otherThing.id].chapter3
                    .content as SetContentsPayload) ??
                    ({} as SetContentsPayload)
            );
            res.success = true;
            return res;
        }
        if (
            [
                'piscesTownMelted',
                'piscesTown2Melted',
                'piscesTown3Melted',
                'house1',
                'house2',
                'house3',
            ].includes(map) &&
            mode === GameModeEnum.COLLECT_MERMAID_TEAR
        ) {
            if (character.inventory.find((item) => item.id === 'object-8')) {
                setContents(
                    (dialogs.piscesTownMelted[otherThing.id].receivedPotion
                        .content as SetContentsPayload) ??
                        ({} as SetContentsPayload)
                );
                res.success = true;
                return res;
            }
            setContents(
                (dialogs.piscesTownMelted[otherThing.id]?.collectMermaidTear
                    .content as SetContentsPayload) ??
                    ({} as SetContentsPayload)
            );
            res.success = true;
            return res;
        }
        if (map.startsWith('underwater')) {
            if (mode === GameModeEnum.GO_TO_MERMAID_CITY) {
                setContents(
                    ((
                        dialogs.underwater[otherThing.id].beforeFight[
                            map
                        ] as NestedDialog
                    ).content as SetContentsPayload) ??
                        ({} as SetContentsPayload)
                );
                res.success = true;
                return res;
            }
            if (mode === GameModeEnum.VICTORY_SEA_MONSTERS) {
                setContents(
                    ((
                        dialogs.underwater[otherThing.id].afterVictory[
                            map
                        ] as NestedDialog
                    ).content as SetContentsPayload) ??
                        ({} as SetContentsPayload)
                );
                res.success = true;
                return res;
            }
        }
        if (
            [
                'piscesTownMelted',
                'piscesTown2Melted',
                'piscesTown3Melted',
                'house1',
                'house2',
                'house3',
            ].includes(map) &&
            mode === GameModeEnum.DELIVER_MERMAID_TEAR
        ) {
            setContents(
                (dialogs.piscesTownMelted[otherThing.id].deliverMermaidTear
                    .content as SetContentsPayload) ??
                    ({} as SetContentsPayload)
            );
            res.success = true;
            return res;
        }
        if (
            [
                'piscesTownMelted',
                'piscesTown2Melted',
                'piscesTown3Melted',
                'house1',
                'house2',
                'house3',
            ].includes(map) &&
            mode === GameModeEnum.BALANCE_RESTORED
        ) {
            setContents(
                (dialogs.piscesTownMelted[otherThing.id].balanceRestored
                    .content as SetContentsPayload) ??
                    ({} as SetContentsPayload)
            );
            res.success = true;
            return res;
        }
    }
    return res;
};
