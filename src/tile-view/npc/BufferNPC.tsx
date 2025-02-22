import { NPC_SPRITE, NPC_SPRITE_DEAD } from '@/constants';
import { ActionCreatorWithPayload } from '@reduxjs/toolkit';
import React, { useRef } from 'react';
import { BufferImageAction, NPC as NPCInterface } from './slices/npcSlice';

interface NPCProps extends NPCInterface {
    idx: number;
    bufferImage: ActionCreatorWithPayload<BufferImageAction, 'npc/bufferImage'>;
}
export const BufferNPC: React.FC<NPCProps> = ({
    id,
    dead,
    idx,
    bufferImage,
}: NPCProps) => {
    const imgRef = useRef<HTMLImageElement>(null);

    return (
        <img
            key={id}
            id={id}
            alt="npc"
            ref={imgRef}
            onLoad={() => {
                bufferImage({ idx: idx, heroImg: `#${imgRef.current!.id}` });
            }}
            className={'images-buffer'}
            src={!dead ? NPC_SPRITE[id] : NPC_SPRITE_DEAD[id]}
        />
    );
};
