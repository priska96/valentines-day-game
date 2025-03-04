import { Autotile_SPRITE } from '@/constants';
import { ActionCreatorWithPayload } from '@reduxjs/toolkit';
import React, { useRef } from 'react';
import {
    BufferImageAction,
    Autotile as AutotileInterface,
} from './slices/autotileSlice';

interface AutotileProps extends AutotileInterface {
    idx: number;
    bufferImage: ActionCreatorWithPayload<
        BufferImageAction,
        'autotile/bufferImage'
    >;
}
export const BufferAutotile: React.FC<AutotileProps> = ({
    id,
    idx,
    bufferImage,
}: AutotileProps) => {
    const imgRef = useRef<HTMLImageElement>(null);

    return (
        <img
            key={id}
            id={id}
            alt="autotile"
            ref={imgRef}
            onLoad={() => {
                bufferImage({
                    idx: idx,
                    autotileImg: `#${imgRef.current!.id}`,
                });
            }}
            className={'images-buffer'}
            src={Autotile_SPRITE[id]}
        />
    );
};
