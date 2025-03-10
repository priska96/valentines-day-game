import React, { useRef } from 'react';
import { HEROES_SPRITE, HEROES_SPRITE_NAKED } from '../../constants';
import { isFullyGeared } from '@/store/createCharacterSlice';
import { useRootStore } from '@/store/useRootStore';

const CharacterBuffer = () => {
    const { bufferImage } = useRootStore();
    const fullyGeared = useRootStore(isFullyGeared);
    const imgRef = useRef<HTMLImageElement>(null);
    const img = fullyGeared === 3 ? HEROES_SPRITE : HEROES_SPRITE_NAKED;

    return (
        <div className="character-images-buffer">
            <img
                id="character"
                alt="character"
                ref={imgRef}
                onLoad={() =>
                    bufferImage({ heroImg: `#${imgRef.current!.id}` })
                }
                className="images-buffer"
                src={img}
            />
        </div>
    );
};

export default CharacterBuffer;
