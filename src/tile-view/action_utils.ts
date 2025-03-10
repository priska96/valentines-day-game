import { dialogs, NestedDialog } from './dialog_utils';
import {
    dragonSword,
    mermaidTear,
    underWaterPotion,
} from './character/inventory';
import {
    CharacterState,
    AddToInventoryPayloadChar,
    UpdatePlayerPositionPayloadChar,
    UpdateNPCPayload,
    OnGameEndPayload,
    UpdateObjectNPCPayload,
    FireActionObjectNPCPayload,
    SetContentsPayload,
} from '@/store/types';
import {
    DialogActionEnum,
    GameModeEnum,
    MELTED_PISCESTOWN_GAME_MODES,
} from '@/store/enums';
import { initialDialogState } from '@/store/createDialogSlice';

export const goToSky = (
    action: DialogActionEnum,
    setContents: (payload: SetContentsPayload) => void,
    changeMap: (map: string) => void,

    updatePlayerPosition: (payload: UpdatePlayerPositionPayloadChar) => void,
    updateNPC: (payload: UpdateNPCPayload) => void
) => {
    if (action === DialogActionEnum.GO_TO_SKY) {
        setContents(initialDialogState);

        changeMap('sky');

        updatePlayerPosition({ x: 7, y: 12, step: 0, dir: 3 });
        updateNPC({
            idx: [0],
            updates: {
                'data-0': { x: 8, y: 12, step: 0, dir: 3, stopMoving: true },
            },
        });

        return true;
    }
    return false;
};

export const enterDungeon = (
    action: DialogActionEnum,
    setContents: (payload: SetContentsPayload) => void,
    changeMap: (map: string) => void,
    updatePlayerPosition: (payload: UpdatePlayerPositionPayloadChar) => void,
    updateNPC: (payload: UpdateNPCPayload) => void,
    updateObjectNPC: (payload: UpdateObjectNPCPayload) => void
) => {
    if (action === DialogActionEnum.ENTER_DUNGEON) {
        setContents(initialDialogState);
        changeMap('evilKing');
        updateObjectNPC({
            idx: [5, 6],
            updates: { 'data-5': { x: 4, y: 10 }, 'data-6': { x: 4, y: 11 } },
        });
        updatePlayerPosition({ x: 7, y: 8, step: 0, dir: 3 });
        updateNPC({
            idx: [2, 1],
            updates: {
                'data-1': { x: 8, y: 3, stopMoving: true },
                'data-2': { x: 3, y: 13 },
            },
        });

        setTimeout(() => {
            setContents(
                (dialogs.evilKing['npc-1'].beforeFight
                    .content as SetContentsPayload) ??
                    ({} as SetContentsPayload)
            );
        }, 200);
        return true;
    }
    return false;
};

export const battleEvilKing = (
    action: DialogActionEnum,
    otherThingIdx: number,
    setContents: (payload: SetContentsPayload) => void,
    onGameEnd: (payload: OnGameEndPayload) => void
) => {
    if (action === DialogActionEnum.BATTLE_EVIL_KING) {
        setContents(initialDialogState);
        onGameEnd({
            mode: GameModeEnum.BATTLE,
            winner: undefined,
            selectedOpponentIdx: otherThingIdx,
        });
        return true;
    }
    return false;
};

export const gameOver = (
    action: DialogActionEnum,
    otherThingIdx: number,
    setContents: (payload: SetContentsPayload) => void,
    onGameEnd: (payload: OnGameEndPayload) => void
) => {
    if (action === DialogActionEnum.GAME_OVER) {
        setContents(initialDialogState);
        onGameEnd({
            mode: GameModeEnum.GAME_OVER,
            winner: 'Evil King',
            selectedOpponentIdx: otherThingIdx,
        });
        return true;
    }
    return false;
};

export const victory = (
    action: DialogActionEnum,
    otherThingIdx: number,
    setContents: (payload: SetContentsPayload) => void,
    fireActionObjectNPC: (payload: FireActionObjectNPCPayload) => void,
    updateNPC: (payload: UpdateNPCPayload) => void,
    onGameEnd: (payload: OnGameEndPayload) => void
) => {
    if (action === DialogActionEnum.VICOTRY) {
        setContents(initialDialogState);
        fireActionObjectNPC({ idx: 5 }); // open door top
        fireActionObjectNPC({ idx: 6 }); // open door bottom

        updateNPC({
            idx: [2, 1],
            updates: {
                'data-2': { x: 4, y: 8 },
                'data-1': { dead: true, stopMoving: true },
            },
        });
        onGameEnd({
            mode: GameModeEnum.GET_OUT,
            winner: 'Jihoon',
            selectedOpponentIdx: otherThingIdx,
        });
        return true;
    }
    return false;
};

export const followHeroOutOfDungeon = (
    action: DialogActionEnum,
    setContents: (payload: SetContentsPayload) => void,
    updateNPC: (payload: UpdateNPCPayload) => void
) => {
    if (action === DialogActionEnum.FOLLOW_HERO) {
        setContents(initialDialogState);
        updateNPC({
            idx: [2],
            updates: {
                'data-2': {
                    followHero: true,
                    stopMoving: false,
                },
            },
        });
        return true;
    }
    return false;
};

export const exitDungeon = (
    action: DialogActionEnum,
    setContents: (payload: SetContentsPayload) => void,
    changeMap: (map: string) => void,
    updatePlayerPosition: (payload: UpdatePlayerPositionPayloadChar) => void,
    updateNPC: (payload: UpdateNPCPayload) => void
) => {
    if (action === DialogActionEnum.EXIT_DUNGEON) {
        setContents(initialDialogState);
        changeMap('dungeonPath');
        updateNPC({
            idx: [2],
            updates: {
                'data-2': {
                    x: 4,
                    y: 3,
                    step: 0,
                    dir: 0,
                    map: ['sky', 'evilKing', 'dungeonPath'],
                },
            },
        });
        updatePlayerPosition({ x: 4, y: 4, step: 0, dir: 0 });

        return true;
    }
    return false;
};

export const leaveDungeon = (
    action: DialogActionEnum,
    setContents: (payload: SetContentsPayload) => void,
    changeMap: (map: string) => void,
    updatePlayerPosition: (payload: UpdatePlayerPositionPayloadChar) => void,
    updateNPC: (payload: UpdateNPCPayload) => void,
    onGameEnd: (payload: OnGameEndPayload) => void
) => {
    if (action === DialogActionEnum.LEAVE_DUNGEON) {
        setContents(initialDialogState);

        changeMap('skyBroken');

        onGameEnd({
            mode: GameModeEnum.GET_OUT,
            winner: 'Jihoon',
            selectedOpponentIdx: 0,
        });
        updateNPC({
            idx: [2],
            updates: {
                'data-2': {
                    x: 6,
                    y: 7,
                    step: 0,
                    dir: 0,
                    stopMoving: true,
                    map: ['skyBroken'],
                },
            },
        });
        updateNPC({ idx: [0], updates: { 'data-0': { map: ['skyBroken'] } } });

        updatePlayerPosition({ x: 5, y: 7, step: 0, dir: 0 });

        setTimeout(() => {
            setContents(
                (dialogs.sky['npc-0'].leftDungeon
                    .content as SetContentsPayload) ??
                    ({} as SetContentsPayload)
            );
        }, 1000);
        return true;
    }
    return false;
};

export const goBackToGround = (
    action: DialogActionEnum,
    setContents: (payload: SetContentsPayload) => void,
    changeMap: (map: string) => void,
    updatePlayerPosition: (payload: UpdatePlayerPositionPayloadChar) => void,
    updateNPC: (payload: UpdateNPCPayload) => void,
    onGameEnd: (payload: OnGameEndPayload) => void
) => {
    if (action === DialogActionEnum.GO_TO_GROUND) {
        setContents(initialDialogState);
        changeMap('forest');
        onGameEnd({
            mode: GameModeEnum.NEW_CHAPTER,
            winner: '',
            selectedOpponentIdx: 0,
        });
        updateNPC({
            idx: [0],
            updates: {
                'data-0': {
                    x: 15,
                    y: 6,
                    step: 0,
                    dir: 3,
                    stopMoving: false,
                    map: ['forest'],
                },
            },
        });
        updateNPC({
            idx: [2],
            updates: {
                'data-2': {
                    x: 14,
                    y: 7,
                    step: 0,
                    dir: 3,
                    stopMoving: false,
                    map: ['forest'],
                    followHero: false,
                },
            },
        });
        updatePlayerPosition({ x: 13, y: 7, step: 0, dir: 3 });
        return true;
    }
    return false;
};

export const followHeroHome = (
    action: DialogActionEnum,
    setContents: (payload: SetContentsPayload) => void,
    updateNPC: (payload: UpdateNPCPayload) => void,
    character: CharacterState
) => {
    if (action === DialogActionEnum.FOLLOW_HERO_HOME) {
        setContents(initialDialogState);
        updateNPC({
            idx: [2],
            updates: {
                'data-2': {
                    x: character.x,
                    y: character.y - 1,
                    dir: 0,
                    followHero: true,
                },
            },
        });
        return true;
    }
    return false;
};

export const goToForest = (
    changeMap: (map: string) => void,
    updateNPC: (payload: UpdateNPCPayload) => void,
    updatePlayerPosition: (payload: UpdatePlayerPositionPayloadChar) => void
) => {
    changeMap('forest');
    updateNPC({
        idx: [2],
        updates: {
            'data-2': {
                x: 15,
                y: 15,
                step: 0,
                dir: 3,
                stopMoving: false,
                map: ['forest'],
                followHero: true,
            },
        },
    });
    updatePlayerPosition({ x: 15, y: 14, step: 0, dir: 3 });
};

export const goToForest2 = (
    changeMap: (map: string) => void,
    updateNPC: (payload: UpdateNPCPayload) => void,
    updatePlayerPosition: (payload: UpdatePlayerPositionPayloadChar) => void,
    mode: string | undefined
) => {
    const princessOnMap = mode === GameModeEnum.NEW_CHAPTER;

    changeMap('forest2');
    if (princessOnMap) {
        updateNPC({
            idx: [2],
            updates: {
                'data-2': {
                    x: 15,
                    y: 0,
                    step: 0,
                    dir: 0,
                    map: ['forest2'],
                },
            },
        });
    }
    updatePlayerPosition({ x: 15, y: 1, step: 0, dir: 0 });
};

export const goToForest2From3 = (
    changeMap: (map: string) => void,
    updateNPC: (payload: UpdateNPCPayload) => void,
    updatePlayerPosition: (payload: UpdatePlayerPositionPayloadChar) => void,
    mode: string | undefined
) => {
    changeMap('forest2');

    const princessOnMap = mode === GameModeEnum.NEW_CHAPTER;
    if (princessOnMap) {
        updateNPC({
            idx: [2],
            updates: {
                'data-2': {
                    x: 5,
                    y: 15,
                    step: 0,
                    dir: 3,
                    map: ['forest2'],
                },
            },
        });
    }
    updatePlayerPosition({ x: 5, y: 14, step: 0, dir: 3 });
};

export const goToForest3 = (
    changeMap: (map: string) => void,
    updateNPC: (payload: UpdateNPCPayload) => void,
    updatePlayerPosition: (payload: UpdatePlayerPositionPayloadChar) => void,
    mode: string | undefined
) => {
    changeMap('forest3');

    const princessOnMap = mode === GameModeEnum.NEW_CHAPTER;
    if (princessOnMap) {
        updateNPC({
            idx: [2],
            updates: {
                'data-2': {
                    x: 15,
                    y: 0,
                    step: 0,
                    dir: 0,
                    map: ['forest3'],
                },
            },
        });
    }
    updatePlayerPosition({ x: 15, y: 1, step: 0, dir: 0 });
};

export const goToForest3From4 = (
    changeMap: (map: string) => void,
    updateNPC: (payload: UpdateNPCPayload) => void,
    updatePlayerPosition: (payload: UpdatePlayerPositionPayloadChar) => void,
    mode: string | undefined
) => {
    const newMap = !MELTED_PISCESTOWN_GAME_MODES.includes(mode as GameModeEnum)
        ? 'forest3'
        : 'forest3Melted';
    changeMap(newMap);

    const princessOnMap = mode === GameModeEnum.NEW_CHAPTER;
    if (princessOnMap) {
        updateNPC({
            idx: [2],
            updates: {
                'data-2': {
                    x: 16,
                    y: 10,
                    step: 0,
                    dir: 1,
                    map: [newMap],
                },
            },
        });
    }
    updatePlayerPosition({ x: 15, y: 10, step: 0, dir: 1 });
};

export const goToForest4 = (
    changeMap: (map: string) => void,
    updateNPC: (payload: UpdateNPCPayload) => void,
    updatePlayerPosition: (payload: UpdatePlayerPositionPayloadChar) => void,
    mode: string | undefined
) => {
    const newMap = !MELTED_PISCESTOWN_GAME_MODES.includes(mode as GameModeEnum)
        ? 'forest4'
        : 'forest4Melted';
    changeMap(newMap);

    const princessOnMap = mode === GameModeEnum.NEW_CHAPTER;
    if (princessOnMap) {
        updateNPC({
            idx: [2],
            updates: {
                'data-2': {
                    x: 0,
                    y: 10,
                    step: 0,
                    dir: 2,
                    map: [newMap],
                },
            },
        });
    }
    updatePlayerPosition({ x: 1, y: 10, step: 1, dir: 2 });
};
export const goToForest4FromPiscesTown = (
    changeMap: (map: string) => void,
    updateNPC: (payload: UpdateNPCPayload) => void,
    updatePlayerPosition: (payload: UpdatePlayerPositionPayloadChar) => void,
    mode: string | undefined
) => {
    const newMap = !MELTED_PISCESTOWN_GAME_MODES.includes(mode as GameModeEnum)
        ? 'forest4'
        : 'forest4Melted';
    changeMap(newMap);

    const princessOnMap = mode === GameModeEnum.NEW_CHAPTER;
    if (princessOnMap) {
        updateNPC({
            idx: [2],
            updates: {
                'data-2': {
                    x: 0,
                    y: 10,
                    step: 0,
                    dir: 2,
                    map: [newMap],
                },
            },
        });
    }
    updatePlayerPosition({ x: 15, y: 1, step: 1, dir: 0 });
};

export const goToPiscesTown = (
    changeMap: (map: string) => void,
    updateNPC: (payload: UpdateNPCPayload) => void,
    updatePlayerPosition: (payload: UpdatePlayerPositionPayloadChar) => void,
    setContents: (payload: SetContentsPayload) => void,
    mode: string | undefined
) => {
    const newMap = !MELTED_PISCESTOWN_GAME_MODES.includes(mode as GameModeEnum)
        ? 'piscesTown'
        : 'piscesTownMelted';
    changeMap(newMap);

    const princessOnMap = mode === GameModeEnum.NEW_CHAPTER;
    if (princessOnMap) {
        updateNPC({
            idx: [2],
            updates: {
                'data-2': {
                    x: 14,
                    y: 15,
                    step: 0,
                    dir: 3,
                    map: [newMap],
                },
            },
        });
    }
    updatePlayerPosition({ x: 14, y: 14, step: 1, dir: 3 });
    if (princessOnMap) {
        setTimeout(() => {
            setContents(
                (dialogs.piscesTown['npc-2'].enterTown
                    .content as SetContentsPayload) ??
                    ({} as SetContentsPayload)
            );
        }, 500);
    }
};
export const goToHouse1 = (
    changeMap: (map: string) => void,
    updateNPC: (payload: UpdateNPCPayload) => void,
    updatePlayerPosition: (payload: UpdatePlayerPositionPayloadChar) => void,
    mode: GameModeEnum | undefined
) => {
    changeMap('house1');

    const princessOnMap = mode === GameModeEnum.NEW_CHAPTER;

    if (princessOnMap) {
        updateNPC({
            idx: [2],
            updates: {
                'data-2': {
                    x: 7,
                    y: 15,
                    step: 1,
                    dir: 3,
                    map: ['house1'],
                },
            },
        });
    }
    updatePlayerPosition({ x: 7, y: 14, step: 1, dir: 3 });
};

export const goPiscesTownFromHouse1 = (
    changeMap: (map: string) => void,
    updateNPC: (payload: UpdateNPCPayload) => void,
    updatePlayerPosition: (payload: UpdatePlayerPositionPayloadChar) => void,
    mode: GameModeEnum | undefined
) => {
    const newMap = !MELTED_PISCESTOWN_GAME_MODES.includes(mode as GameModeEnum)
        ? 'piscesTown'
        : 'piscesTownMelted';

    changeMap(newMap);

    const princessOnMap = mode === GameModeEnum.NEW_CHAPTER;

    if (princessOnMap) {
        updateNPC({
            idx: [2],
            updates: {
                'data-2': {
                    x: 3,
                    y: 7,
                    step: 1,
                    dir: 0,
                    map: [newMap],
                },
            },
        });
    }
    updatePlayerPosition({ x: 3, y: 8, step: 1, dir: 0 });
};

export const goToPiscesTown2 = (
    changeMap: (map: string) => void,
    updateNPC: (payload: UpdateNPCPayload) => void,
    updatePlayerPosition: (payload: UpdatePlayerPositionPayloadChar) => void,
    mode: string | undefined
) => {
    const newMap = !MELTED_PISCESTOWN_GAME_MODES.includes(mode as GameModeEnum)
        ? 'piscesTown2'
        : 'piscesTown2Melted';

    changeMap(newMap);

    const princessOnMap = mode === GameModeEnum.NEW_CHAPTER;
    if (princessOnMap) {
        updateNPC({
            idx: [2],
            updates: {
                'data-2': {
                    x: 0,
                    y: 7,
                    step: 0,
                    dir: 2,
                    map: [newMap],
                },
            },
        });
    }
    updatePlayerPosition({ x: 1, y: 7, step: 1, dir: 2 });
};

export const goToPiscesTownFrom2 = (
    changeMap: (map: string) => void,
    updateNPC: (payload: UpdateNPCPayload) => void,
    updatePlayerPosition: (payload: UpdatePlayerPositionPayloadChar) => void,
    mode: string | undefined
) => {
    const newMap = !MELTED_PISCESTOWN_GAME_MODES.includes(mode as GameModeEnum)
        ? 'piscesTown'
        : 'piscesTownMelted';

    changeMap(newMap);

    const princessOnMap = mode === GameModeEnum.NEW_CHAPTER;

    if (princessOnMap) {
        updateNPC({
            idx: [2],
            updates: {
                'data-2': {
                    x: 16,
                    y: 7,
                    step: 1,
                    dir: 1,
                    map: [newMap],
                },
            },
        });
    }
    updatePlayerPosition({ x: 15, y: 7, step: 1, dir: 1 });
};

export const goToPiscesTown2From3 = (
    changeMap: (map: string) => void,
    updateNPC: (payload: UpdateNPCPayload) => void,
    updatePlayerPosition: (payload: UpdatePlayerPositionPayloadChar) => void,
    mode: GameModeEnum | undefined
) => {
    const newMap = !MELTED_PISCESTOWN_GAME_MODES.includes(mode as GameModeEnum)
        ? 'piscesTown2'
        : 'piscesTown2Melted';

    changeMap(newMap);

    const princessOnMap = mode === GameModeEnum.NEW_CHAPTER;

    if (princessOnMap) {
        updateNPC({
            idx: [2],
            updates: {
                'data-2': {
                    x: 16,
                    y: 16,
                    step: 1,
                    dir: 1,
                    map: [newMap],
                },
            },
        });
    }
    updatePlayerPosition({ x: 8, y: 1, step: 1, dir: 0 });
};

export const goToPiscesTown3 = (
    changeMap: (map: string) => void,
    updateNPC: (payload: UpdateNPCPayload) => void,
    updatePlayerPosition: (payload: UpdatePlayerPositionPayloadChar) => void,
    setContents: (payload: SetContentsPayload) => void,
    mode: string | undefined
) => {
    const newMap = !MELTED_PISCESTOWN_GAME_MODES.includes(mode as GameModeEnum)
        ? 'piscesTown3'
        : 'piscesTown3Melted';
    changeMap(newMap);

    const princessOnMap = mode === GameModeEnum.NEW_CHAPTER;
    if (princessOnMap) {
        updateNPC({
            idx: [4, 3, 2],
            updates: {
                'data-4': { x: 7, y: 10, map: ['piscesTown3'] },
                'data-3': { x: 9, y: 10, map: ['piscesTown3'] },
                'data-2': {
                    x: 8,
                    y: 15,
                    step: 1,
                    dir: 3,
                    stopMoving: true,
                    map: [newMap],
                    followHero: false,
                },
            },
        });
    }
    updatePlayerPosition({ x: 8, y: 14, step: 1, dir: 3 });
    if (princessOnMap) {
        setTimeout(() => {
            setContents(
                (dialogs.piscesTown['npc-3'].beforeFight
                    .content as SetContentsPayload) ??
                    ({} as SetContentsPayload)
            );
        }, 200);
    }
};

export const goToHouse2 = (
    changeMap: (map: string) => void,
    updateNPC: (payload: UpdateNPCPayload) => void,
    updatePlayerPosition: (payload: UpdatePlayerPositionPayloadChar) => void,
    mode: GameModeEnum | undefined
) => {
    changeMap('house2');

    const princessOnMap = mode === GameModeEnum.NEW_CHAPTER;

    if (princessOnMap) {
        updateNPC({
            idx: [2],
            updates: {
                'data-2': {
                    x: 4,
                    y: 15,
                    step: 1,
                    dir: 3,
                    map: ['house2'],
                },
            },
        });
    }
    updatePlayerPosition({ x: 4, y: 14, step: 1, dir: 3 });
};

export const goPiscesTown2FromHouse2 = (
    changeMap: (map: string) => void,
    updateNPC: (payload: UpdateNPCPayload) => void,
    updatePlayerPosition: (payload: UpdatePlayerPositionPayloadChar) => void,
    mode: GameModeEnum | undefined
) => {
    const newMap = !MELTED_PISCESTOWN_GAME_MODES.includes(mode as GameModeEnum)
        ? 'piscesTown2'
        : 'piscesTown2Melted';

    changeMap(newMap);

    const princessOnMap = mode === GameModeEnum.NEW_CHAPTER;

    if (princessOnMap) {
        updateNPC({
            idx: [2],
            updates: {
                'data-2': {
                    x: 3,
                    y: 7,
                    step: 1,
                    dir: 0,
                    map: [newMap],
                },
            },
        });
    }
    updatePlayerPosition({ x: 3, y: 8, step: 1, dir: 0 });
};

export const goToHouse3 = (
    changeMap: (map: string) => void,
    updateNPC: (payload: UpdateNPCPayload) => void,
    updatePlayerPosition: (payload: UpdatePlayerPositionPayloadChar) => void,
    mode: GameModeEnum | undefined
) => {
    changeMap('house3');

    const princessOnMap = mode === GameModeEnum.NEW_CHAPTER;

    if (princessOnMap) {
        updateNPC({
            idx: [2],
            updates: {
                'data-2': {
                    x: 9,
                    y: 15,
                    step: 1,
                    dir: 3,
                    map: ['house3'],
                },
            },
        });
    }
    updatePlayerPosition({ x: 9, y: 14, step: 1, dir: 3 });
};

export const goPiscesTown2FromHouse3 = (
    changeMap: (map: string) => void,
    updateNPC: (payload: UpdateNPCPayload) => void,
    updatePlayerPosition: (payload: UpdatePlayerPositionPayloadChar) => void,
    mode: GameModeEnum | undefined
) => {
    const newMap = !MELTED_PISCESTOWN_GAME_MODES.includes(mode as GameModeEnum)
        ? 'piscesTown2'
        : 'piscesTown2Melted';

    changeMap(newMap);

    const princessOnMap = mode === GameModeEnum.NEW_CHAPTER;

    if (princessOnMap) {
        updateNPC({
            idx: [2],
            updates: {
                'data-2': {
                    x: 15,
                    y: 14,
                    step: 1,
                    dir: 1,
                    map: [newMap],
                },
            },
        });
    }
    updatePlayerPosition({ x: 14, y: 14, step: 1, dir: 1 });
};

export const goToWellInner = (
    changeMap: (map: string) => void,

    updateCharacterState: (updates: Partial<CharacterState>) => void,
    updateNPC: (payload: UpdateNPCPayload) => void
) => {
    updateNPC({
        idx: [1, 3],
        updates: {
            'data-1': { map: [] },
            'data-3': { map: [] },
        },
    });
    changeMap('wellInner');
    updateCharacterState({
        x: 8,
        y: 0,
        step: 1,
        dir: 1,
        animate: 'fall-into-well',
    });
};

export const goToUnderwater2FromUnderwater = (
    changeMap: (map: string) => void,
    updatePlayerPosition: (payload: UpdatePlayerPositionPayloadChar) => void
) => {
    changeMap('underwater2');
    updatePlayerPosition({ x: 7, y: 15, step: 1, dir: 3 });
};
export const goToUnderwaterFromUnderwater2 = (
    changeMap: (map: string) => void,
    updatePlayerPosition: (payload: UpdatePlayerPositionPayloadChar) => void
) => {
    changeMap('underwater');
    updatePlayerPosition({ x: 7, y: 0, step: 1, dir: 0 });
};

export const goToUnderwater3FromUnderwater2 = (
    changeMap: (map: string) => void,
    updatePlayerPosition: (payload: UpdatePlayerPositionPayloadChar) => void
) => {
    changeMap('underwater3');
    updatePlayerPosition({ x: 0, y: 9, step: 1, dir: 2 });
};

export const goToUnderwater2FromUnderwater3 = (
    changeMap: (map: string) => void,
    updatePlayerPosition: (payload: UpdatePlayerPositionPayloadChar) => void
) => {
    changeMap('underwater2');
    updatePlayerPosition({ x: 16, y: 8, step: 1, dir: 1 });
};

export const goToUnderwater4FromUnderwater3 = (
    changeMap: (map: string) => void,
    updatePlayerPosition: (payload: UpdatePlayerPositionPayloadChar) => void,
    setContents: (payload: SetContentsPayload) => void
) => {
    changeMap('underwater4');
    updatePlayerPosition({ x: 0, y: 10, step: 1, dir: 1 });
    setTimeout(() => {
        setContents(
            ((
                dialogs.underwater['npc-29'].beforeFight
                    .underwater4 as NestedDialog
            ).content as SetContentsPayload) ?? ({} as SetContentsPayload)
        );
    }, 200);
};

export const beforeBattleEvilQueen = (
    action: DialogActionEnum,
    setContents: (payload: SetContentsPayload) => void,
    updateNPC: (payload: UpdateNPCPayload) => void
) => {
    if (action === DialogActionEnum.BEFORE_BATTLE_EVIL_QUEEN) {
        setContents(initialDialogState);
        updateNPC({
            idx: [2],
            updates: { 'data-2': { animate: 'walk-to-dad', stopMoving: true } },
        });
        return true;
    }
    return false;
};

export const beforeBattleEvilQueen2 = (
    action: DialogActionEnum,
    setContents: (payload: SetContentsPayload) => void,
    updateNPC: (payload: UpdateNPCPayload) => void
) => {
    if (action === DialogActionEnum.BEFORE_BATTLE_EVIL_QUEEN2) {
        setContents(initialDialogState);
        updateNPC({
            idx: [2, 1],
            updates: {
                'data-2': { x: 7, y: 12 },
                'data-1': {
                    x: 8,
                    y: 0,
                    step: 1,
                    dir: 1,
                    stopMoving: true,
                    map: ['piscesTown3'],
                    followHero: false,
                    animate: 'evil-king-fall-down',
                },
            },
        });
        return true;
    }
    return false;
};

export const battleEvilQueen = (
    action: DialogActionEnum,
    otherThingIdx: number,
    setContents: (payload: SetContentsPayload) => void,
    onGameEnd: (payload: OnGameEndPayload) => void
) => {
    if (action === DialogActionEnum.BATTLE_EVIL_QUEEN) {
        setContents(initialDialogState);
        onGameEnd({
            mode: GameModeEnum.BATTLE,
            winner: undefined,
            selectedOpponentIdx: otherThingIdx,
        });
        return true;
    }
    return false;
};

export const victoryEvilQueen = (
    action: DialogActionEnum,
    otherThingIdx: number,
    setContents: (payload: SetContentsPayload) => void,
    updateNPC: (payload: UpdateNPCPayload) => void,
    onGameEnd: (payload: OnGameEndPayload) => void
) => {
    if (action === DialogActionEnum.VICTORY_EVIL_QUEEN) {
        setContents(initialDialogState);
        updateNPC({
            idx: [3, 1],
            updates: {
                'data-3': { dead: true, stopMoving: true },
                'data-1': {
                    x: 10,
                    y: 12,
                    dead: true,
                    stopMoving: true,
                    animate: '',
                },
                'data-2': {
                    animate: '',
                },
            },
        });
        onGameEnd({
            mode: GameModeEnum.VICTORY_EVIL_QUEEN,
            winner: 'Jihoon',
            selectedOpponentIdx: otherThingIdx,
        });
        return true;
    }
    return false;
};

export const gameOverEvilQueen = (
    action: DialogActionEnum,
    otherThingIdx: number,
    setContents: (payload: SetContentsPayload) => void,
    onGameEnd: (payload: OnGameEndPayload) => void
) => {
    if (action === DialogActionEnum.GAME_OVER_EVIL_QUEEN) {
        setContents(initialDialogState);
        onGameEnd({
            mode: GameModeEnum.GAME_OVER,
            winner: 'Evil Queen',
            selectedOpponentIdx: otherThingIdx,
        });
        return true;
    }
    return false;
};

export const gameWonEvilQueen = (
    action: DialogActionEnum,
    otherThingIdx: number,
    setContents: (payload: SetContentsPayload) => void,
    onGameEnd: (payload: OnGameEndPayload) => void
) => {
    if (action === DialogActionEnum.GAME_WON_EVIL_QUEEN) {
        setContents(initialDialogState);
        onGameEnd({
            mode: GameModeEnum.GAME_WON,
            winner: 'Jihoon',
            selectedOpponentIdx: otherThingIdx,
        });
        return true;
    }
    return false;
};

export const getReward = (
    action: DialogActionEnum,
    setContents: (payload: SetContentsPayload) => void
) => {
    if (action === DialogActionEnum.REWARDED_KING) {
        setContents(
            (dialogs.piscesTownMelted['npc-4'].getReward
                .content as SetContentsPayload) ?? ({} as SetContentsPayload)
        );
        return true;
    }
    return false;
};

export const receiveSword = (
    action: DialogActionEnum,
    setContents: (payload: SetContentsPayload) => void,
    addToInventory: (payload: AddToInventoryPayloadChar) => void,
    onGameEnd: (payload: OnGameEndPayload) => void,
    otherThingIdx: number
) => {
    if (action === DialogActionEnum.RECEIVE_SWORD) {
        setContents(initialDialogState);
        addToInventory({ item: dragonSword });
        onGameEnd({
            mode: GameModeEnum.CHAPTER3,
            winner: '',
            selectedOpponentIdx: otherThingIdx,
        });
        return true;
    }
    return false;
};

export const spellBroken = (
    action: DialogActionEnum,
    setContents: (payload: SetContentsPayload) => void,
    changeMap: (map: string) => void,
    updateNPC: (payload: UpdateNPCPayload) => void
) => {
    if (action === DialogActionEnum.SPELL_BROKEN) {
        setContents(initialDialogState);
        changeMap('piscesTown3Melted');
        updateNPC({
            idx: [6, 5, 4, 3, 2, 1],
            updates: {
                'data-6': {
                    x: 13,
                    y: 6,
                    map: ['piscesTown3Melted'],
                    stopMoving: false,
                },
                'data-5': {
                    x: 3,
                    y: 12,
                    map: ['piscesTown3Melted'],
                    stopMoving: false,
                },
                'data-4': { map: ['piscesTown3Melted'] },
                'data-3': { x: 9, y: 10, map: ['piscesTown3Melted'] },
                'data-2': { map: ['piscesTown3Melted'] },
                'data-1': { map: ['piscesTown3Melted'] },
            },
        });

        return true;
    }
    return false;
};

export const seerComesOut = (
    action: DialogActionEnum,
    setContents: (payload: SetContentsPayload) => void,
    updateNPC: (payload: UpdateNPCPayload) => void
) => {
    if (action === DialogActionEnum.SEER_COMES_OUT) {
        setContents(initialDialogState);
        updateNPC({
            idx: [10],
            updates: {
                'data-10': {
                    x: 8,
                    y: 8,
                    step: 0,
                    dir: 0,
                    map: ['piscesTown3Melted'],
                    stopMoving: false,
                    animate: 'seer-comes-out',
                },
            },
        });
        return true;
    }
    return false;
};
export const collectMermaidTear = (
    action: DialogActionEnum,
    setContents: (payload: SetContentsPayload) => void,
    updateNPC: (payload: UpdateNPCPayload) => void,
    onGameEnd: (payload: OnGameEndPayload) => void,
    otherThingIdx: number
) => {
    if (action === DialogActionEnum.COLLECT_MERMAID_TEAR) {
        setContents(initialDialogState);
        updateNPC({
            idx: [10],
            updates: {
                'data-10': {
                    map: ['piscesTown3Melted'],
                    stopMoving: false,
                    animate: '',
                },
            },
        });
        onGameEnd({
            mode: GameModeEnum.GET_OUT,
            winner: '',
            selectedOpponentIdx: otherThingIdx,
        });

        setTimeout(() => {
            setContents(
                (dialogs.piscesTownMelted['npc-2'].collectMermaidTear
                    .content as SetContentsPayload) ??
                    ({} as SetContentsPayload)
            );
        }, 1000);

        setTimeout(() => {
            onGameEnd({
                mode: GameModeEnum.COLLECT_MERMAID_TEAR,
                winner: '',
                selectedOpponentIdx: otherThingIdx,
            });
        }, 8000);

        return true;
    }
    return false;
};

export const receivePotion = (
    action: DialogActionEnum,
    setContents: (payload: SetContentsPayload) => void,
    addToInventory: (payload: AddToInventoryPayloadChar) => void
) => {
    if (action === DialogActionEnum.RECEIVE_POTION) {
        setContents(initialDialogState);
        addToInventory({ item: underWaterPotion });

        return true;
    }
    return false;
};

export const goToMermaidCity = (
    action: DialogActionEnum,
    setContents: (payload: SetContentsPayload) => void,
    onGameEnd: (payload: OnGameEndPayload) => void,
    otherThingIdx: number
) => {
    if (action === DialogActionEnum.GO_TO_MERMAID_CITY) {
        setContents(initialDialogState);

        onGameEnd({
            mode: GameModeEnum.GO_TO_MERMAID_CITY,
            winner: '',
            selectedOpponentIdx: otherThingIdx,
        });
        return true;
    }
    return false;
};

export const battleSeaMonster1 = (
    action: DialogActionEnum,
    otherThingIdx: number,
    setContents: (payload: SetContentsPayload) => void,
    onGameEnd: (payload: OnGameEndPayload) => void
) => {
    if (action === DialogActionEnum.SEA_MONSTER1_BATTLE) {
        setContents(initialDialogState);
        onGameEnd({
            mode: GameModeEnum.BATTLE,
            winner: undefined,
            selectedOpponentIdx: otherThingIdx,
        });
        return true;
    }
    return false;
};

export const battleSeaMonster2 = (
    action: DialogActionEnum,
    otherThingIdx: number,
    setContents: (payload: SetContentsPayload) => void,
    onGameEnd: (payload: OnGameEndPayload) => void
) => {
    if (action === DialogActionEnum.SEA_MONSTER2_BATTLE) {
        setContents(initialDialogState);
        onGameEnd({
            mode: GameModeEnum.BATTLE,
            winner: undefined,
            selectedOpponentIdx: otherThingIdx,
        });
        return true;
    }
    return false;
};

export const victorySeaMonsters = (
    action: DialogActionEnum,
    otherThingIdx: number,
    setContents: (payload: SetContentsPayload) => void,
    onGameEnd: (payload: OnGameEndPayload) => void,
    updateNPC: (payload: UpdateNPCPayload) => void
) => {
    if (action === DialogActionEnum.VICTORY_SEA_MONSTERS) {
        setContents(initialDialogState);
        updateNPC({
            idx: [3, 1],
            updates: {
                'data-31': { dead: true, stopMoving: true },
                'data-32': {
                    dead: true,
                    stopMoving: true,
                },
            },
        });
        onGameEnd({
            mode: GameModeEnum.VICTORY_SEA_MONSTERS,
            winner: undefined,
            selectedOpponentIdx: otherThingIdx,
        });
        return true;
    }
    return false;
};

export const getMermaidTear = (
    action: DialogActionEnum,
    setContents: (payload: SetContentsPayload) => void
) => {
    if (action === DialogActionEnum.GET_MERMAID_TEAR) {
        setContents(
            ((
                dialogs.underwater['npc-30'].receiveMermaidTear
                    .underwater4 as NestedDialog
            ).content as SetContentsPayload) ?? ({} as SetContentsPayload)
        );
        return true;
    }
    return false;
};

export const receiveMermaidTear = (
    action: DialogActionEnum,
    setContents: (payload: SetContentsPayload) => void,
    addToInventory: (payload: AddToInventoryPayloadChar) => void,
    onGameEnd: (payload: OnGameEndPayload) => void,
    otherThingIdx: number,
    changeMap: (map: string) => void,
    updatePlayerPosition: (payload: UpdatePlayerPositionPayloadChar) => void
) => {
    if (action === DialogActionEnum.RECEIVE_MERMAID_TEAR) {
        setContents(initialDialogState);
        addToInventory({ item: mermaidTear });
        onGameEnd({
            mode: GameModeEnum.WHIRLPOOL,
            winner: '',
            selectedOpponentIdx: otherThingIdx,
        });
        setTimeout(() => {
            onGameEnd({
                mode: GameModeEnum.DELIVER_MERMAID_TEAR,
                winner: '',
                selectedOpponentIdx: otherThingIdx,
            });
            changeMap('piscesTown2Melted');
            updatePlayerPosition({ x: 8, y: 8, step: 1, dir: 1 });
        }, 5000);

        return true;
    }
    return false;
};

export const seerRestoresBalance = (
    action: DialogActionEnum,
    setContents: (payload: SetContentsPayload) => void,
    updateNPC: (payload: UpdateNPCPayload) => void,
    onGameEnd: (payload: OnGameEndPayload) => void,
    otherThingIdx: number
) => {
    if (action === DialogActionEnum.RESTORE_BALANCE) {
        setContents(initialDialogState);
        onGameEnd({
            mode: GameModeEnum.RESTORE_BALANCE,
            winner: '',
            selectedOpponentIdx: otherThingIdx,
        });
        updateNPC({
            idx: [10],
            updates: {
                'data-10': {
                    dir: 3,
                    animate: 'seer-goes-back',
                },
            },
        });
        return true;
    }
    return false;
};

export const balanceRestored = (
    action: DialogActionEnum,
    otherThingIdx: number,
    setContents: (payload: SetContentsPayload) => void,
    onGameEnd: (payload: OnGameEndPayload) => void
) => {
    if (action === DialogActionEnum.BALANCE_RESTORED) {
        setContents(initialDialogState);
        onGameEnd({
            mode: GameModeEnum.EXPLOSION,
            winner: '',
            selectedOpponentIdx: otherThingIdx,
        });
        return true;
    }
    return false;
};

export const chapter3GetReward = (
    action: DialogActionEnum,
    otherThingIdx: number,
    setContents: (payload: SetContentsPayload) => void,
    onGameEnd: (payload: OnGameEndPayload) => void
) => {
    if (action === DialogActionEnum.CHAPTER3_REWARD) {
        setContents(initialDialogState);
        onGameEnd({
            mode: GameModeEnum.GAME_WON_CHAPTER3_REWARD,
            winner: '',
            selectedOpponentIdx: otherThingIdx,
        });
        return true;
    }
    return false;
};
