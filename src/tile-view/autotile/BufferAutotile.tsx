import { Autotile_SPRITE } from '@/constants';
import React, { useRef } from 'react';
import {
    Autotile as AutotileInterface,
    BufferImagePayloadAutotile,
} from '@/store/types';

interface AutotileProps extends AutotileInterface {
    idx: number;
    bufferImage: (payload: BufferImagePayloadAutotile) => void;
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
