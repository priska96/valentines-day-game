import { OBJECT_NPC_SPRITE } from '@/constants';
import { ActionCreatorWithPayload } from '@reduxjs/toolkit';
import React, { useRef } from 'react';
import { BufferImageAction } from './slices/objectSlice';

interface ObjectNPCProps {
    id: string;
    x: number;
    y: number;
    item: string;
    objectImg: string | null;
    type: string;
    map: string[];
    tookItem: boolean;
    healing: number;
    idx: number;
    bufferImage: ActionCreatorWithPayload<
        BufferImageAction,
        'objectNPC/bufferImage'
    >;
}

export const BufferObjectNPC: React.FC<ObjectNPCProps> = ({
    id,
    idx,
    bufferImage,
    tookItem,
}: ObjectNPCProps) => {
    const imgRef = useRef<HTMLImageElement>(null);

    return (
        <img
            key={id}
            id={id}
            alt="objectNPC"
            ref={imgRef}
            onLoad={() => {
                bufferImage({ idx: idx, objectImg: `#${imgRef.current!.id}` });
            }}
            className="images-buffer"
            src={
                !tookItem ? OBJECT_NPC_SPRITE[id][0] : OBJECT_NPC_SPRITE[id][1]
            }
        />
    );
};
