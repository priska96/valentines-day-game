import React, { useEffect, useRef, useCallback } from 'react';
import { Sprite } from 'react-konva';
import { HERO_IMAGE_SIZE } from '../../constants';
import { MOVE_DIRECTIONS, MoveDirectionsInterface } from '../constants';
import { TILE_SIZE } from '../maps/mapData';
import { checkMapCollision } from '../utils';
import { Sprite as SpriteClass } from 'konva/lib/shapes/Sprite';
import {
    animateFallIntoWell,
    handleDialogAction,
    handleGameEndConditions,
    handleNPCFollow,
    handleWildFight,
} from './utils/moveFunctions';
import { useRootStore } from '@/store/useRootStore';

const CharacterKonva = () => {
    const {
        character,
        move,
        updatePlayerPosition,
        addToInventory,
        updateCharacterState,
        npcs,
        moveNPC,
        fireActionNPC,
        updateNPC,
        autotiles,
        gameStatus,
        changeMap,
        onGameEnd,
        loadCharacter,
        objectNPCs,
        fireActionObjectNPC,
        updateObjectNPC,
        dialog,
        setContents,
    } = useRootStore();
    const {
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
    } = character;

    const { mode, map, winner } = gameStatus;
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
                [...npcs, ...objectNPCs, ...autotiles],
                map
            );
            console.log('collusion', collusion);
            if (!collusion) {
                move({ x: xDir, y: yDir, dirKey: key });
                handleGameEndConditions(x, y, map, onGameEnd);
                //handleWildFight(map, mode, setContents, onGameEnd); //TODO: put back in
                handleNPCFollow(x, y, key, npcs, moveNPC);
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
                npcs,
                objectNPCs,
                autotiles,
                character,
                map,
                winner,
                mode,
                setContents,
                fireActionNPC,
                onGameEnd,
                changeMap,
                updatePlayerPosition,
                updateNPC,
                updateObjectNPC,
                fireActionObjectNPC,
                addToInventory,
                updateCharacterState
            );
        }
    };

    const moveCharacter = useCallback(
        handleMovement,
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [spriteRef, move, x, y, step, dir, dialog, animate]
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

export default CharacterKonva;
