import React, { useEffect, useRef, useCallback } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { Sprite } from 'react-konva';

import { RootState } from '../../store';
import {
    addToInventory,
    move,
    updateCharacterState,
    updatePlayerPosition,
} from './slices/characterSlice';
import { changeMap, loadCharacter, onGameEnd } from '../slices/statusSlice';
import { HERO_IMAGE_SIZE } from '../../constants';
import { MOVE_DIRECTIONS, MoveDirectionsInterface } from '../constants';
import { TILE_SIZE } from '../maps/mapData';
import { checkMapCollision } from '../utils';
import { fireAction, updateNPC, move as moveNPC } from '../npc/slices/npcSlice';
import { setContents } from '../../game-ui/slices/dialogSlice';
import {
    updateObject,
    fireAction as fireActionObject,
} from '../objectNPC/slices/objectSlice';
import { Sprite as SpriteClass } from 'konva/lib/shapes/Sprite';
import {
    animateFallIntoWell,
    handleDialogAction,
    handleGameEndConditions,
    handleNPCFollow,
    handleWildFight,
} from './utils/moveFunctions';

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
    animate,
    npc,
    objectNPC,
    autotile,
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
    updateCharacterState,
}: PropsFromRedux) => {
    const spriteRef = useRef<SpriteClass>(null);

    useEffect(() => {
        if (heroImg) {
            loadCharacter(true);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [heroImg]);

    useEffect(() => {
        animateFallIntoWell({
            spriteRef,
            animate,
            updateCharacterState,
        });

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [animate]);
    /**
     * Handles character movement based on keyboard input.
     * @param e - The keyboard event.
     */
    const handleMovement = (e: KeyboardEvent) => {
        if (animate !== '') {
            return;
        }
        const key = e.key;
        e.preventDefault();

        if (MOVE_DIRECTIONS[key as keyof MoveDirectionsInterface]) {
            const [xDir, yDir] =
                MOVE_DIRECTIONS[key as keyof MoveDirectionsInterface];
            const collusion = checkMapCollision(
                x + xDir,
                y + yDir,
                [...npc.npcs, ...objectNPC.objects, ...autotile.autotiles],
                map
            );
            if (!collusion) {
                move({ x: xDir, y: yDir, dirKey: key });
                handleGameEndConditions(x + xDir, y + yDir, map, onGameEnd);
                //handleWildFight(map, mode, setContents, onGameEnd); //TODO: put back in
                handleNPCFollow(xDir, yDir, key, npc, moveNPC);
            } else {
                move({ x: 0, y: 0, dirKey: key });
            }
        }

        if (key === 'Enter') {
            const character = {
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
                animate,
            };
            handleDialogAction(
                dialog,
                npc,
                objectNPC,
                autotile,
                character,
                map,
                winner,
                mode,
                setContents,
                fireAction,
                onGameEnd,
                changeMap,
                updatePlayerPosition,
                updateNPC,
                updateObject,
                fireActionObject,
                addToInventory,
                updateCharacterState
            );
        }
    };

    const moveCharacter = useCallback(handleMovement, [
        spriteRef,
        move,
        x,
        y,
        step,
        dir,
        dialog,
        animate,
    ]);

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
    autotile: state.autotile,
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
    updateCharacterState,
};

const connector = connect(mapStateToProps, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;

const ConnectedCharacterKonva = connector(CharacterKonva);

export default ConnectedCharacterKonva;
