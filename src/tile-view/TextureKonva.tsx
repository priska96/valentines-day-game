import React, { useEffect, useState } from 'react';
import { Rect, Group } from 'react-konva';
import { MAP_DIMENSIONS } from './maps/mapData';
import { useRootStore } from '@/store/useRootStore';

const TextureKonva = () => {
    const { gameStatus } = useRootStore();
    const { map, textureImg } = gameStatus;

    const { COLS, ROWS } = MAP_DIMENSIONS;
    const [xY, setXY] = useState({ x: 0, y: 0 });

    useEffect(() => {
        if (!map.startsWith('underwater')) {
            return;
        }
        const interval = setInterval(() => {
            setXY((prev) => {
                return { x: prev.x - 50, y: prev.y - 50 };
            });
        }, 1700);
        return () => clearInterval(interval);
    }, [map]);

    if (!map.startsWith('underwater')) {
        return <></>;
    }
    return (
        <Group>
            <Rect
                opacity={0.2}
                x={0}
                y={0}
                width={COLS * 32}
                height={ROWS * 32}
                fillPatternRepeat="repeat"
                fillPatternImage={
                    document.querySelector(textureImg[0]) as HTMLImageElement
                }
                fillPatternOffsetX={xY.x}
                fillPatternOffsetY={xY.y}
                fillPatternScale={{ x: 0.35, y: 0.35 }}
            />
            <Rect
                opacity={0.4}
                x={0}
                y={0}
                width={COLS * 32}
                height={ROWS * 32}
                fillPatternRepeat="repeat"
                fillPatternImage={
                    document.querySelector(textureImg[1]) as HTMLImageElement
                }
                fillPatternOffsetX={xY.x + 4}
                fillPatternOffsetY={xY.y + 4}
                fillPatternScale={{ x: 0.5, y: 0.5 }}
            />
        </Group>
    );
};

export default TextureKonva;
