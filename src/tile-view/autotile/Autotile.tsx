import { Autotile_IMAGE_SIZE } from '@/constants';
import Konva from 'konva';
import { useRef, useEffect, useState } from 'react';
import { Sprite } from 'react-konva';
import { MOVE_DIRECTIONS, MoveDirectionsInterface } from '../constants';
import { TILE_SIZE } from '../maps/mapData';
import { movesList } from '../utils';
import {
    CharacterState,
    LoadAutotilePayload,
    MovePayloadAutotile,
    SetContentsPayload,
} from '@/store/types';
import { Autotile as AutotileInterface } from '@/store/types';
import { GameModeEnum } from '@/store/enums';

interface AutotileProps extends AutotileInterface {
    idx: number;
    loadAutotile: (payload: LoadAutotilePayload) => void;
    move: (payload: MovePayloadAutotile) => void;
    setContents: (payload: SetContentsPayload) => void;
    currentMap: string;
    character: CharacterState;
    mode: string | undefined;
}

export const Autotile: React.FC<AutotileProps> = ({
    id,
    x,
    y,
    step = 0,
    dir = 0,
    stopMoving,
    autotileImg,
    idx,
    loadAutotile,
    move,
    map,
    currentMap,
    mode,
}: AutotileProps) => {
    const currentImgSize = Autotile_IMAGE_SIZE[id];
    const spriteRef = useRef<Konva.Sprite>(null);
    const [movesListIdx, setMovesListIdx] = useState(0);

    useEffect(() => {
        if (autotileImg && map.includes(currentMap)) {
            loadAutotile({ idx: idx, val: true });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [autotileImg, map, idx, currentMap]);

    const moveAutotile = (keyString: string, idx: number) => {
        if (stopMoving) return;
        if (MOVE_DIRECTIONS[keyString as keyof MoveDirectionsInterface]) {
            move({ x: 0, y: 0, dirKey: keyString, idx });
        }
    };

    useEffect(() => {
        if (mode === GameModeEnum.START) {
            return;
        }
        if (!map.includes(currentMap)) {
            return;
        }
        const interval = setInterval(() => {
            moveAutotile(movesList[movesListIdx], idx);
            setMovesListIdx((prev) => (prev + 1 === 4 ? 0 : prev + 1));
        }, 1000);
        return () => clearInterval(interval);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [movesListIdx, stopMoving, idx, mode, map, currentMap]);

    return autotileImg && map.includes(currentMap) ? (
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
            image={document.querySelector(autotileImg) as HTMLImageElement}
        />
    ) : null;
};
