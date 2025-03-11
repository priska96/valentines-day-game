import React from 'react';
import { useEffect } from 'react';
import { Sprite } from 'react-konva';
import { TILE_SIZE } from '../maps/mapData';
import { LoadObjectPayload } from '@/store/types';

interface ObjectNPCProps {
    id: string;
    x: number;
    y: number;
    item: string;
    objectImg: string | null;
    type: string;
    map: string[];
    healing: number;
    idx: number;
    loadObject: (payload: LoadObjectPayload) => void;
    currentMap: string;
}

export const ObjectNPC: React.FC<ObjectNPCProps> = ({
    x,
    y,
    objectImg,
    map,
    idx,
    loadObject,
    currentMap,
}: ObjectNPCProps) => {
    useEffect(() => {
        if (objectImg && map.includes(currentMap)) {
            loadObject({ idx: idx, val: true });
        }
    }, [loadObject, map, idx, objectImg, currentMap]);

    return objectImg && map.includes(currentMap) ? (
        <Sprite
            key={idx}
            x={x * TILE_SIZE} //horizontal position
            y={y * TILE_SIZE} //vertical position
            animation={'0'}
            animations={{
                '0': [0 * TILE_SIZE, 0 * TILE_SIZE, TILE_SIZE, TILE_SIZE],
            }}
            frameRate={0}
            frameIndex={0}
            image={document.querySelector(objectImg) as HTMLImageElement}
        />
    ) : null;
};
