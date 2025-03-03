import { NPC_IMAGE_SIZE } from '@/constants';
import { SetContentsAction } from '@/game-ui/slices/dialogSlice';
import { ActionCreatorWithPayload } from '@reduxjs/toolkit';
import Konva from 'konva';
import { useRef, useEffect } from 'react';
import { Sprite } from 'react-konva';
import { CharacterState } from '../character/slices/characterSlice';
import { MOVE_DIRECTIONS, MoveDirectionsInterface } from '../constants';
import { TILE_SIZE } from '../maps/mapData';
import { ObjectState } from '../objectNPC/slices/objectSlice';
import { GameModeEnum, LoadNPCAction } from '../slices/statusSlice';
import { checkMapCollision, getRandom, movesList } from '../utils';
import { MoveAction, NPCState, NPC as NPCInterface } from './slices/npcSlice';
import {
    animateFallDownEvilKing,
    animateSeerComesOut,
    animateWalkToDad,
} from './utils/moveNPCFunctions';

interface NPCProps extends NPCInterface {
    idx: number;
    loadNPC: ActionCreatorWithPayload<LoadNPCAction, 'gameStatus/loadNPC'>;
    move: ActionCreatorWithPayload<MoveAction, 'npc/move'>;
    setContents: ActionCreatorWithPayload<
        SetContentsAction,
        'dialog/setContents'
    >;
    currentMap: string;
    character: CharacterState;
    objectNPC: ObjectState;
    allNPC: NPCState;
    mode: string | undefined;
}

export const NPC: React.FC<NPCProps> = ({
    id,
    x,
    y,
    step = 0,
    dir = 0,
    stopMoving,
    heroImg,
    followHero,
    animate,
    idx,
    loadNPC,
    move,
    setContents,
    map,
    character,
    objectNPC,
    currentMap,
    allNPC,
    mode,
}: NPCProps) => {
    const currentImgSize = NPC_IMAGE_SIZE[id];
    const spriteRef = useRef<Konva.Sprite>(null);

    useEffect(() => {
        animateFallDownEvilKing({
            spriteRef,
            animate,
            setContents,
        });

        animateWalkToDad({
            spriteRef,
            animate,
            setContents,
        });
        animateSeerComesOut({
            spriteRef,
            animate,
            setContents,
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [animate]);

    useEffect(() => {
        if (heroImg && map.includes(currentMap)) {
            loadNPC({ idx: idx, val: true });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [heroImg, map, idx, currentMap]);

    const moveNPC = (keyString: string, idx: number) => {
        if (stopMoving) return;
        if (MOVE_DIRECTIONS[keyString as keyof MoveDirectionsInterface]) {
            const [xDir, yDir] =
                MOVE_DIRECTIONS[keyString as keyof MoveDirectionsInterface];
            const collusion = checkMapCollision(
                x + xDir,
                y + yDir,
                [
                    character,
                    ...objectNPC.objects,
                    ...allNPC.npcs.filter((npc) => npc.id !== id),
                ],
                currentMap
            );
            if (!collusion) {
                move({ x: xDir, y: yDir, dirKey: keyString, idx });
            }
        }
    };

    useEffect(() => {
        if (mode === GameModeEnum.START) {
            return;
        }
        if (followHero) {
            return;
        }
        if (!map.includes(currentMap)) {
            return;
        }
        const interval = setInterval(() => {
            moveNPC(getRandom(movesList), idx);
        }, 1500);
        return () => clearInterval(interval);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [x, y, stopMoving, idx, followHero, mode, map, currentMap]);

    return heroImg && map.includes(currentMap) ? (
        <Sprite
            key={idx}
            ref={spriteRef}
            x={x * TILE_SIZE} //horizontal position
            y={y * TILE_SIZE} //vertical position
            animation={dir.toString()}
            animations={{
                '0': [
                    0 * currentImgSize,
                    0 * currentImgSize,
                    currentImgSize,
                    currentImgSize,
                    1 * currentImgSize,
                    0 * currentImgSize,
                    currentImgSize,
                    currentImgSize,
                    2 * currentImgSize,
                    0 * currentImgSize,
                    currentImgSize,
                    currentImgSize,
                ],
                '1': [
                    0 * currentImgSize,
                    1 * currentImgSize,
                    currentImgSize,
                    currentImgSize,
                    1 * currentImgSize,
                    1 * currentImgSize,
                    currentImgSize,
                    currentImgSize,
                    2 * currentImgSize,
                    1 * currentImgSize,
                    currentImgSize,
                    currentImgSize,
                ],
                '2': [
                    0 * currentImgSize,
                    2 * currentImgSize,
                    currentImgSize,
                    currentImgSize,
                    1 * currentImgSize,
                    2 * currentImgSize,
                    currentImgSize,
                    currentImgSize,
                    2 * currentImgSize,
                    2 * currentImgSize,
                    currentImgSize,
                    currentImgSize,
                ],
                '3': [
                    0 * currentImgSize,
                    3 * currentImgSize,
                    currentImgSize,
                    currentImgSize,
                    1 * currentImgSize,
                    3 * currentImgSize,
                    currentImgSize,
                    currentImgSize,
                    2 * currentImgSize,
                    3 * currentImgSize,
                    currentImgSize,
                    currentImgSize,
                ],
            }}
            frameRate={3}
            frameIndex={step}
            image={document.querySelector(heroImg) as HTMLImageElement}
        />
    ) : null;
};
