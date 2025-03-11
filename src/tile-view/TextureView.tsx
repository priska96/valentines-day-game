import React, { useEffect, useRef } from 'react';
import Water from '../images/water-texture.png';
import Water2 from '../images/water-texture2.png';
import { useRootStore } from '@/store/useRootStore';

const TextureView = () => {
    const { gameStatus, bufferTextureImage, loadTexture } = useRootStore();

    const imgRef = useRef<HTMLImageElement>(null);

    useEffect(() => {
        if (gameStatus.textureImg.length === 2) {
            loadTexture(true);
        }
    }, [gameStatus.textureImg, loadTexture]);

    return (
        <>
            <img
                id="watertexture"
                src={Water}
                alt="texture"
                ref={imgRef}
                className="images-buffer"
                onLoad={() => {
                    bufferTextureImage({
                        idx: 0,
                        textureImg: `#${imgRef.current!.id}`,
                    });
                }}
            />
            <img
                id="watertexture2"
                src={Water2}
                alt="texture"
                ref={imgRef}
                className="images-buffer"
                onLoad={() => {
                    bufferTextureImage({
                        idx: 1,
                        textureImg: `#${imgRef.current!.id}`,
                    });
                }}
            />
        </>
    );
};

export default TextureView;
