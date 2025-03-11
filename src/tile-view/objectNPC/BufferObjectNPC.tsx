import { OBJECT_NPC_SPRITE } from '@/constants';
import React, { useRef } from 'react';
import { BufferImageObjectNPCPayload } from '@/store/types';

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
    bufferImage: (payload: BufferImageObjectNPCPayload) => void;
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
