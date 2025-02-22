import React, { useEffect, useRef, useCallback } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { Sprite } from 'react-konva';

import { RootState } from '../../store';
import {
    addToInventory,
    move,
    updatePlayerPosition,
} from './slices/characterSlice';
import { changeMap, loadCharacter, onGameEnd } from '../slices/statusSlice';
import { HERO_IMAGE_SIZE } from '../../constants';
import { MOVE_DIRECTIONS, MoveDirectionsInterface } from '../constants';
import { TILE_SIZE } from '../maps/mapImgs';
import { checkMapCollision } from '../utils';
import { fireAction, updateNPC, move as moveNPC } from '../npc/slices/npcSlice';
import { doAction, finishAction } from './dialogActions';
import { setContents } from '../../game-ui/slices/dialogSlice';
import {
    updateObject,
    fireAction as fireActionObject,
} from '../objectNPC/slices/objectSlice';
import { Sprite as SpriteClass } from 'konva/lib/shapes/Sprite';

const CharacterKonva: React.FC<PropsFromRedux> = ({
    x,
    y,
    step = 0,
    dir = 0,
    heroClass,
    heroImg,
    type,
    playerSummary,
    inventory,
    portrait,
    npc,
    objectNPC,
    map,
    dialog,
    winner,
    mode,
    move,
    loadCharacter,
    changeMap,
    updateNPC,
    setContents,
    fireAction,
    onGameEnd,
    updatePlayerPosition,
    updateObject,
    fireActionObject,
    addToInventory,
    moveNPC,
}: PropsFromRedux) => {
    const spriteRef = useRef<SpriteClass>(null);

    useEffect(() => {
        if (heroImg) {
            loadCharacter(true);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const moveCharacter = useCallback(
        (e: KeyboardEvent) => {
            const key = e.key;

            e.preventDefault();
            if (MOVE_DIRECTIONS[key as keyof MoveDirectionsInterface]) {
                const [xDir, yDir] =
                    MOVE_DIRECTIONS[key as keyof MoveDirectionsInterface];
                const collusion = checkMapCollision(
                    x + xDir,
                    y + yDir,
                    [...npc.npcs, ...objectNPC.objects],
                    map
                );
                if (!collusion) {
                    move({ x: xDir, y: yDir, dirKey: key });
                    if (
                        map === 'forest2' &&
                        ((x + xDir === 2 && y + yDir === 8) ||
                            (x + xDir === 6 && y + yDir === 12))
                    ) {
                        onGameEnd({
                            mode: 'game-over-hole',
                            winner: undefined,
                            selectedOpponentIdx: 0,
                        });
                    }
                    if (
                        (map === 'forest2' || map === 'forest3') &&
                        mode !== 'battle'
                    ) {
                        const wildFightOpts = [
                            true,
                            false,
                            false,
                            true,
                            false,
                            true,
                            false,
                            true,
                            false,
                            false,
                            true,
                            false,
                            false,
                            false,
                            false,
                            false,
                            false,
                            false,
                            false,
                            false,
                            false,
                        ];
                        if (
                            wildFightOpts[
                                Math.floor(Math.random() * wildFightOpts.length)
                            ]
                        ) {
                            const oppenent = [7, 8, 9];

                            setContents({
                                open: true,
                                title: 'Warning!!',
                                text: 'A wild monster attacked you!',
                                openerId: '',
                                action: '',
                            });
                            setTimeout(() => {
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
                                    selectedOpponentIdx:
                                        oppenent[
                                            Math.floor(
                                                Math.random() * oppenent.length
                                            )
                                        ],
                                });
                            }, 3500);
                        }
                    }

                    if (npc.npcs.some((n) => n.followHero)) {
                        npc.npcs.forEach((n, idx) => {
                            if (n.followHero) {
                                moveNPC({ x: xDir, y: yDir, dirKey: key, idx });
                            }
                        });
                    }
                }
            }

            if (key === 'Enter') {
                if (dialog.open) {
                    finishAction(
                        dialog,
                        npc,
                        objectNPC,
                        {
                            x,
                            y,
                            step,
                            dir,
                            heroClass,
                            heroImg,
                            type,
                            playerSummary,
                            inventory,
                            portrait,
                        },
                        setContents,
                        fireAction,
                        onGameEnd,
                        changeMap,
                        updatePlayerPosition,
                        updateNPC,
                        updateObject,
                        fireActionObject,
                        addToInventory
                    );
                } else {
                    doAction(
                        map,
                        {
                            x,
                            y,
                            step,
                            dir,
                            heroClass,
                            heroImg,
                            type,
                            playerSummary,
                            inventory,
                            portrait,
                        },
                        npc,
                        objectNPC,
                        winner,
                        mode,
                        setContents,
                        fireAction,
                        onGameEnd,
                        changeMap,
                        updatePlayerPosition,
                        updateNPC
                    );
                }
            }
            if (key === 'm') {
                changeMap('sky');
                updateNPC({
                    idx: [2, 1],
                    updates: {
                        'data-1': { x: 8, y: 3, stopMoving: true },
                        'data-2': { x: 3, y: 13 },
                    },
                });
            }
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [spriteRef, move, x, y, step, dir, dialog]
    );

    useEffect(() => {
        document.addEventListener('keypress', moveCharacter);
        return () => {
            document.removeEventListener('keypress', moveCharacter);
        };
    }, [moveCharacter]);

    return (
        heroImg && (
            <Sprite
                ref={spriteRef}
                x={x * TILE_SIZE} //horizontal position
                y={y * TILE_SIZE} //vertical position
                animation={dir.toString()}
                animations={{
                    '0': [
                        0 * HERO_IMAGE_SIZE,
                        0 * HERO_IMAGE_SIZE,
                        HERO_IMAGE_SIZE,
                        HERO_IMAGE_SIZE,
                        1 * HERO_IMAGE_SIZE,
                        0 * HERO_IMAGE_SIZE,
                        HERO_IMAGE_SIZE,
                        HERO_IMAGE_SIZE,
                        2 * HERO_IMAGE_SIZE,
                        0 * HERO_IMAGE_SIZE,
                        HERO_IMAGE_SIZE,
                        HERO_IMAGE_SIZE,
                    ],
                    '1': [
                        0 * HERO_IMAGE_SIZE,
                        1 * HERO_IMAGE_SIZE,
                        HERO_IMAGE_SIZE,
                        HERO_IMAGE_SIZE,
                        1 * HERO_IMAGE_SIZE,
                        1 * HERO_IMAGE_SIZE,
                        HERO_IMAGE_SIZE,
                        HERO_IMAGE_SIZE,
                        2 * HERO_IMAGE_SIZE,
                        1 * HERO_IMAGE_SIZE,
                        HERO_IMAGE_SIZE,
                        HERO_IMAGE_SIZE,
                    ],
                    '2': [
                        0 * HERO_IMAGE_SIZE,
                        2 * HERO_IMAGE_SIZE,
                        HERO_IMAGE_SIZE,
                        HERO_IMAGE_SIZE,
                        1 * HERO_IMAGE_SIZE,
                        2 * HERO_IMAGE_SIZE,
                        HERO_IMAGE_SIZE,
                        HERO_IMAGE_SIZE,
                        2 * HERO_IMAGE_SIZE,
                        2 * HERO_IMAGE_SIZE,
                        HERO_IMAGE_SIZE,
                        HERO_IMAGE_SIZE,
                    ],
                    '3': [
                        0 * HERO_IMAGE_SIZE,
                        3 * HERO_IMAGE_SIZE,
                        HERO_IMAGE_SIZE,
                        HERO_IMAGE_SIZE,
                        1 * HERO_IMAGE_SIZE,
                        3 * HERO_IMAGE_SIZE,
                        HERO_IMAGE_SIZE,
                        HERO_IMAGE_SIZE,
                        2 * HERO_IMAGE_SIZE,
                        3 * HERO_IMAGE_SIZE,
                        HERO_IMAGE_SIZE,
                        HERO_IMAGE_SIZE,
                    ],
                }}
                frameRate={3}
                frameIndex={step}
                image={
                    document.querySelector(heroImg) ?? ({} as HTMLImageElement)
                }
            />
        )
    );
};

const mapStateToProps = (state: RootState) => ({
    ...state.character,
    npc: state.npc,
    objectNPC: state.objectNPC,
    map: state.gameStatus.map,
    mode: state.gameStatus.mode,
    winner: state.gameStatus.winner,
    dialog: state.dialog,
});

const mapDispatch = {
    loadCharacter,
    move,
    changeMap,
    updateNPC,
    setContents,
    fireAction,
    onGameEnd,
    updatePlayerPosition,
    updateObject,
    fireActionObject,
    addToInventory,
    moveNPC,
};

const connector = connect(mapStateToProps, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;

const ConnectedCharacterKonva = connector(CharacterKonva);

export default ConnectedCharacterKonva;
