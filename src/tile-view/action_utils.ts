import { dialogs } from './dialog_utils';
import { ActionCreatorWithPayload } from '@reduxjs/toolkit';
import {
    CharacterState,
    UpdatePlayerPositionAction,
} from './character/slices/characterSlice';
import { FireAction, UpdateNPCAction } from './npc/slices/npcSlice';
import { UpdateObjectAction } from './objectNPC/slices/objectSlice';
import { OnGameEndAction } from './slices/statusSlice';
import { SetContentsAction } from '@/game-ui/slices/dialogSlice';

export const goToSky = (
    action: string,
    setContents: ActionCreatorWithPayload<
        SetContentsAction,
        'dialog/setContents'
    >,
    changeMap: ActionCreatorWithPayload<string, 'gameStatus/changeMap'>,
    updatePlayerPosition: ActionCreatorWithPayload<
        UpdatePlayerPositionAction,
        'character/updatePlayerPosition'
    >,
    updateNPC: ActionCreatorWithPayload<UpdateNPCAction, 'npc/updateNPC'>
) => {
    if (action === 'go-to-sky') {
        setContents({
            open: false,
            title: '',
            text: '',
            openerId: '',
            action: '',
        });

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
    action: string,
    setContents: ActionCreatorWithPayload<
        SetContentsAction,
        'dialog/setContents'
    >,
    changeMap: ActionCreatorWithPayload<string, 'gameStatus/changeMap'>,
    updatePlayerPosition: ActionCreatorWithPayload<
        UpdatePlayerPositionAction,
        'character/updatePlayerPosition'
    >,
    updateNPC: ActionCreatorWithPayload<UpdateNPCAction, 'npc/updateNPC'>,
    updateObject: ActionCreatorWithPayload<
        UpdateObjectAction,
        'objectNPC/updateObject'
    >
) => {
    if (action === 'enter-dungeon') {
        setContents({
            open: false,
            title: '',
            text: '',
            openerId: '',
            action: '',
        });
        changeMap('evilKing');
        updateObject({
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
                dialogs.evilKing['npc-1'].beforeFight.content ??
                    ({} as SetContentsAction)
            );
        }, 200);
        return true;
    }
    return false;
};

export const battleEvilKing = (
    action: string,
    otherThingIdx: number,
    setContents: ActionCreatorWithPayload<
        SetContentsAction,
        'dialog/setContents'
    >,
    onGameEnd: ActionCreatorWithPayload<OnGameEndAction, 'gameStatus/onGameEnd'>
) => {
    if (action === 'battle-evil-king') {
        setContents({
            open: false,
            title: '',
            text: '',
            openerId: '',
            action: '',
        });
        onGameEnd({
            mode: 'battle',
            winner: undefined,
            selectedOpponentIdx: otherThingIdx,
        });
        return true;
    }
    return false;
};

export const gameOver = (
    action: string,
    otherThingIdx: number,
    setContents: ActionCreatorWithPayload<
        SetContentsAction,
        'dialog/setContents'
    >,
    onGameEnd: ActionCreatorWithPayload<OnGameEndAction, 'gameStatus/onGameEnd'>
) => {
    if (action === 'game-over') {
        setContents({
            open: false,
            title: '',
            text: '',
            openerId: '',
            action: '',
        });
        onGameEnd({
            mode: 'game-over',
            winner: 'Evil King',
            selectedOpponentIdx: otherThingIdx,
        });
        return true;
    }
    return false;
};

export const victory = (
    action: string,
    otherThingIdx: number,
    setContents: ActionCreatorWithPayload<
        SetContentsAction,
        'dialog/setContents'
    >,
    fireActionObject: ActionCreatorWithPayload<
        FireAction,
        'objectNPC/fireAction'
    >,
    updateNPC: ActionCreatorWithPayload<UpdateNPCAction, 'npc/updateNPC'>,
    onGameEnd: ActionCreatorWithPayload<OnGameEndAction, 'gameStatus/onGameEnd'>
) => {
    if (action === 'victory') {
        setContents({
            open: false,
            title: '',
            text: '',
            openerId: '',
            action: '',
        });
        fireActionObject({ idx: 5 }); // open door top
        fireActionObject({ idx: 6 }); // open door bottom

        updateNPC({
            idx: [2, 1],
            updates: {
                'data-2': { x: 4, y: 8 },
                'data-1': { dead: true, stopMoving: true },
            },
        });
        onGameEnd({
            mode: 'get-out',
            winner: 'Jihoon',
            selectedOpponentIdx: otherThingIdx,
        });
        return true;
    }
    return false;
};

export const exitDungeon = (
    action: string,
    setContents: ActionCreatorWithPayload<
        SetContentsAction,
        'dialog/setContents'
    >,
    changeMap: ActionCreatorWithPayload<string, 'gameStatus/changeMap'>,
    updatePlayerPosition: ActionCreatorWithPayload<
        UpdatePlayerPositionAction,
        'character/updatePlayerPosition'
    >,
    updateNPC: ActionCreatorWithPayload<UpdateNPCAction, 'npc/updateNPC'>
) => {
    if (action === 'exit-dungeon') {
        setContents({
            open: false,
            title: '',
            text: '',
            openerId: '',
            action: '',
        });
        changeMap('dungeonPath');
        updateNPC({
            idx: [2],
            updates: {
                'data-2': {
                    x: 4,
                    y: 3,
                    step: 0,
                    dir: 0,
                    followHero: true,
                    stopMoving: false,
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
    action: string,
    setContents: ActionCreatorWithPayload<
        SetContentsAction,
        'dialog/setContents'
    >,
    changeMap: ActionCreatorWithPayload<string, 'gameStatus/changeMap'>,
    updatePlayerPosition: ActionCreatorWithPayload<
        UpdatePlayerPositionAction,
        'character/updatePlayerPosition'
    >,
    updateNPC: ActionCreatorWithPayload<UpdateNPCAction, 'npc/updateNPC'>,
    onGameEnd: ActionCreatorWithPayload<OnGameEndAction, 'gameStatus/onGameEnd'>
) => {
    if (action === 'leave-dungeon') {
        setContents({
            open: false,
            title: '',
            text: '',
            openerId: '',
            action: '',
        });

        changeMap('skyBroken');

        onGameEnd({
            mode: 'get-out',
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
                dialogs.sky['npc-0'].leftDungeon.content ??
                    ({} as SetContentsAction)
            );
        }, 1000);
        return true;
    }
    return false;
};

export const goBackToGround = (
    action: string,
    setContents: ActionCreatorWithPayload<
        SetContentsAction,
        'dialog/setContents'
    >,
    changeMap: ActionCreatorWithPayload<string, 'gameStatus/changeMap'>,
    updatePlayerPosition: ActionCreatorWithPayload<
        UpdatePlayerPositionAction,
        'character/updatePlayerPosition'
    >,
    updateNPC: ActionCreatorWithPayload<UpdateNPCAction, 'npc/updateNPC'>,
    onGameEnd: ActionCreatorWithPayload<OnGameEndAction, 'gameStatus/onGameEnd'>
) => {
    if (action === 'go-to-ground') {
        setContents({
            open: false,
            title: '',
            text: '',
            openerId: '',
            action: '',
        });
        changeMap('forest');
        onGameEnd({ mode: 'newChapter', winner: '', selectedOpponentIdx: 0 });
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
    action: string,
    setContents: ActionCreatorWithPayload<
        SetContentsAction,
        'dialog/setContents'
    >,
    updateNPC: ActionCreatorWithPayload<UpdateNPCAction, 'npc/updateNPC'>,
    character: CharacterState
) => {
    if (action === 'follow-hero-home') {
        setContents({
            open: false,
            title: '',
            text: '',
            openerId: '',
            action: '',
        });
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
    changeMap: ActionCreatorWithPayload<string, 'gameStatus/changeMap'>,
    updateNPC: ActionCreatorWithPayload<UpdateNPCAction, 'npc/updateNPC'>,
    updatePlayerPosition: ActionCreatorWithPayload<
        UpdatePlayerPositionAction,
        'character/updatePlayerPosition'
    >
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
    changeMap: ActionCreatorWithPayload<string, 'gameStatus/changeMap'>,
    updateNPC: ActionCreatorWithPayload<UpdateNPCAction, 'npc/updateNPC'>,
    updatePlayerPosition: ActionCreatorWithPayload<
        UpdatePlayerPositionAction,
        'character/updatePlayerPosition'
    >
) => {
    changeMap('forest2');
    updateNPC({
        idx: [2],
        updates: {
            'data-2': {
                x: 15,
                y: 0,
                step: 0,
                dir: 0,
                stopMoving: false,
                map: ['forest2'],
                followHero: true,
            },
        },
    });
    updatePlayerPosition({ x: 15, y: 1, step: 0, dir: 0 });
};

export const goToForest2From3 = (
    changeMap: ActionCreatorWithPayload<string, 'gameStatus/changeMap'>,
    updateNPC: ActionCreatorWithPayload<UpdateNPCAction, 'npc/updateNPC'>,
    updatePlayerPosition: ActionCreatorWithPayload<
        UpdatePlayerPositionAction,
        'character/updatePlayerPosition'
    >
) => {
    changeMap('forest2');
    updateNPC({
        idx: [2],
        updates: {
            'data-2': {
                x: 5,
                y: 15,
                step: 0,
                dir: 3,
                stopMoving: false,
                map: ['forest2'],
                followHero: true,
            },
        },
    });
    updatePlayerPosition({ x: 5, y: 14, step: 0, dir: 3 });
};

export const goToForest3 = (
    changeMap: ActionCreatorWithPayload<string, 'gameStatus/changeMap'>,
    updateNPC: ActionCreatorWithPayload<UpdateNPCAction, 'npc/updateNPC'>,
    updatePlayerPosition: ActionCreatorWithPayload<
        UpdatePlayerPositionAction,
        'character/updatePlayerPosition'
    >
) => {
    changeMap('forest3');
    updateNPC({
        idx: [2],
        updates: {
            'data-2': {
                x: 15,
                y: 0,
                step: 0,
                dir: 0,
                stopMoving: false,
                map: ['forest3'],
                followHero: true,
            },
        },
    });
    updatePlayerPosition({ x: 15, y: 1, step: 0, dir: 0 });
};

export const goToForest3From4 = (
    changeMap: ActionCreatorWithPayload<string, 'gameStatus/changeMap'>,
    updateNPC: ActionCreatorWithPayload<UpdateNPCAction, 'npc/updateNPC'>,
    updatePlayerPosition: ActionCreatorWithPayload<
        UpdatePlayerPositionAction,
        'character/updatePlayerPosition'
    >,
    mode: string | undefined
) => {
    const newMap = mode !== 'victory-evil-queen' ? 'forest3' : 'forest3Melted';
    changeMap(newMap);
    updateNPC({
        idx: [2],
        updates: {
            'data-2': {
                x: 16,
                y: 10,
                step: 0,
                dir: 1,
                stopMoving: false,
                map: [newMap],
                followHero: true,
            },
        },
    });
    updatePlayerPosition({ x: 15, y: 10, step: 0, dir: 1 });
};
export const goToForest4 = (
    changeMap: ActionCreatorWithPayload<string, 'gameStatus/changeMap'>,
    updateNPC: ActionCreatorWithPayload<UpdateNPCAction, 'npc/updateNPC'>,
    updatePlayerPosition: ActionCreatorWithPayload<
        UpdatePlayerPositionAction,
        'character/updatePlayerPosition'
    >,
    mode: string | undefined
) => {
    const newMap = mode !== 'victory-evil-queen' ? 'forest4' : 'forest4Melted';
    changeMap(newMap);
    updateNPC({
        idx: [2],
        updates: {
            'data-2': {
                x: 0,
                y: 10,
                step: 0,
                dir: 2,
                stopMoving: false,
                map: [newMap],
                followHero: true,
            },
        },
    });
    updatePlayerPosition({ x: 1, y: 10, step: 1, dir: 2 });
};
export const goToPiscesTown = (
    changeMap: ActionCreatorWithPayload<string, 'gameStatus/changeMap'>,
    updateNPC: ActionCreatorWithPayload<UpdateNPCAction, 'npc/updateNPC'>,
    updatePlayerPosition: ActionCreatorWithPayload<
        UpdatePlayerPositionAction,
        'character/updatePlayerPosition'
    >,
    setContents: ActionCreatorWithPayload<
        SetContentsAction,
        'dialog/setContents'
    >
) => {
    changeMap('piscesTown');
    updateNPC({
        idx: [2],
        updates: {
            'data-2': {
                x: 14,
                y: 15,
                step: 0,
                dir: 3,
                stopMoving: false,
                map: ['piscesTown'],
                followHero: true,
            },
        },
    });
    updatePlayerPosition({ x: 14, y: 14, step: 1, dir: 3 });
    setTimeout(() => {
        setContents(
            dialogs.piscesTown['npc-2'].enterTown.content ??
                ({} as SetContentsAction)
        );
    }, 500);
};
export const goToPiscesTown2 = (
    changeMap: ActionCreatorWithPayload<string, 'gameStatus/changeMap'>,
    updateNPC: ActionCreatorWithPayload<UpdateNPCAction, 'npc/updateNPC'>,
    updatePlayerPosition: ActionCreatorWithPayload<
        UpdatePlayerPositionAction,
        'character/updatePlayerPosition'
    >
) => {
    changeMap('piscesTown2');
    updateNPC({
        idx: [2],
        updates: {
            'data-2': {
                x: 0,
                y: 7,
                step: 0,
                dir: 2,
                stopMoving: false,
                map: ['piscesTown2'],
                followHero: true,
            },
        },
    });
    updatePlayerPosition({ x: 1, y: 7, step: 1, dir: 2 });
};
export const goToPiscesTownFrom2 = (
    changeMap: ActionCreatorWithPayload<string, 'gameStatus/changeMap'>,
    updateNPC: ActionCreatorWithPayload<UpdateNPCAction, 'npc/updateNPC'>,
    updatePlayerPosition: ActionCreatorWithPayload<
        UpdatePlayerPositionAction,
        'character/updatePlayerPosition'
    >
) => {
    changeMap('piscesTown');
    updateNPC({
        idx: [2],
        updates: {
            'data-2': {
                x: 16,
                y: 7,
                step: 1,
                dir: 1,
                stopMoving: false,
                map: ['piscesTown'],
                followHero: true,
            },
        },
    });
    updatePlayerPosition({ x: 15, y: 7, step: 1, dir: 1 });
};
export const goToPiscesTown3 = (
    changeMap: ActionCreatorWithPayload<string, 'gameStatus/changeMap'>,
    updateNPC: ActionCreatorWithPayload<UpdateNPCAction, 'npc/updateNPC'>,
    updatePlayerPosition: ActionCreatorWithPayload<
        UpdatePlayerPositionAction,
        'character/updatePlayerPosition'
    >,
    setContents: ActionCreatorWithPayload<
        SetContentsAction,
        'dialog/setContents'
    >
) => {
    changeMap('piscesTown3');
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
                map: ['piscesTown3'],
                followHero: false,
            },
        },
    });
    updatePlayerPosition({ x: 8, y: 14, step: 1, dir: 3 });
    setTimeout(() => {
        setContents(
            dialogs.piscesTown['npc-3'].beforeFight.content ??
                ({} as SetContentsAction)
        );
    }, 200);
};

export const beforeBattleEvilQueen = (
    action: string,
    setContents: ActionCreatorWithPayload<
        SetContentsAction,
        'dialog/setContents'
    >,
    updateNPC: ActionCreatorWithPayload<UpdateNPCAction, 'npc/updateNPC'>
) => {
    if (action === 'before-battle-evil-queen') {
        setContents({
            open: false,
            title: '',
            text: '',
            openerId: '',
            action: '',
        });
        updateNPC({
            idx: [2],
            updates: { 'data-2': { animate: 'walk-to-dad', stopMoving: true } },
        });
        return true;
    }
    return false;
};

export const beforeBattleEvilQueen2 = (
    action: string,
    setContents: ActionCreatorWithPayload<
        SetContentsAction,
        'dialog/setContents'
    >,
    updateNPC: ActionCreatorWithPayload<UpdateNPCAction, 'npc/updateNPC'>
) => {
    if (action === 'before-battle-evil-queen2') {
        setContents({
            open: false,
            title: '',
            text: '',
            openerId: '',
            action: '',
        });
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
    action: string,
    otherThingIdx: number,
    setContents: ActionCreatorWithPayload<
        SetContentsAction,
        'dialog/setContents'
    >,
    onGameEnd: ActionCreatorWithPayload<OnGameEndAction, 'gameStatus/onGameEnd'>
) => {
    if (action === 'battle-evil-queen') {
        setContents({
            open: false,
            title: '',
            text: '',
            openerId: '',
            action: '',
        });
        onGameEnd({
            mode: 'battle',
            winner: undefined,
            selectedOpponentIdx: otherThingIdx,
        });
        return true;
    }
    return false;
};

export const victoryEvilQueen = (
    action: string,
    otherThingIdx: number,
    setContents: ActionCreatorWithPayload<
        SetContentsAction,
        'dialog/setContents'
    >,
    updateNPC: ActionCreatorWithPayload<UpdateNPCAction, 'npc/updateNPC'>,
    onGameEnd: ActionCreatorWithPayload<OnGameEndAction, 'gameStatus/onGameEnd'>
) => {
    if (action === 'victory-evil-queen') {
        setContents({
            open: false,
            title: '',
            text: '',
            openerId: '',
            action: '',
        });
        updateNPC({
            idx: [3, 1],
            updates: {
                'data-3': { dead: true, stopMoving: true },
                'data-1': { x: 10, y: 12, dead: true, stopMoving: true },
            },
        });
        onGameEnd({
            mode: 'victory-evil-queen',
            winner: 'Jihoon',
            selectedOpponentIdx: otherThingIdx,
        });
        return true;
    }
    return false;
};

export const gameOverEvilQueen = (
    action: string,
    otherThingIdx: number,
    setContents: ActionCreatorWithPayload<
        SetContentsAction,
        'dialog/setContents'
    >,
    onGameEnd: ActionCreatorWithPayload<OnGameEndAction, 'gameStatus/onGameEnd'>
) => {
    if (action === 'game-over-evil-queen') {
        setContents({
            open: false,
            title: '',
            text: '',
            openerId: '',
            action: '',
        });
        onGameEnd({
            mode: 'game-over',
            winner: 'Evil Queen',
            selectedOpponentIdx: otherThingIdx,
        });
        return true;
    }
    return false;
};
export const gameWonEvilQueen = (
    action: string,
    otherThingIdx: number,
    setContents: ActionCreatorWithPayload<
        SetContentsAction,
        'dialog/setContents'
    >,
    onGameEnd: ActionCreatorWithPayload<OnGameEndAction, 'gameStatus/onGameEnd'>
) => {
    if (action === 'game-won-evil-queen') {
        setContents({
            open: false,
            title: '',
            text: '',
            openerId: '',
            action: '',
        });
        onGameEnd({
            mode: 'game-won',
            winner: 'Jihoon',
            selectedOpponentIdx: otherThingIdx,
        });
        return true;
    }
    return false;
};

export const spellBroken = (
    action: string,
    otherThingIdx: number,
    setContents: ActionCreatorWithPayload<
        SetContentsAction,
        'dialog/setContents'
    >,
    onGameEnd: ActionCreatorWithPayload<
        OnGameEndAction,
        'gameStatus/onGameEnd'
    >,
    changeMap: ActionCreatorWithPayload<string, 'gameStatus/changeMap'>,
    updateNPC: ActionCreatorWithPayload<UpdateNPCAction, 'npc/updateNPC'>
) => {
    if (action === 'spell-broken') {
        setContents({
            open: false,
            title: '',
            text: '',
            openerId: '',
            action: '',
        });
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
