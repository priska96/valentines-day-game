import React, { useEffect, useRef } from 'react';
import Sky from '../images/sky_background.png';
import Underwater from '../images/underwater_background.png';
import { useRootStore } from '@/store/useRootStore';

const BackgroundView = () => {
    const { gameStatus, bufferBackgroundImage, loadBackground } =
        useRootStore();
    const imgRef = useRef<HTMLImageElement>(null);
    const imgRef2 = useRef<HTMLImageElement>(null);

    useEffect(() => {
        if (gameStatus.backgroundImg.length === 2) {
            loadBackground(true);
        }
    }, [gameStatus.backgroundImg, loadBackground]);

    return (
        <>
            <img
                id="skybackground"
                src={Sky}
                alt="background"
                ref={imgRef}
                className="images-buffer"
                onLoad={() => {
                    bufferBackgroundImage({
                        idx: 0,
                        backgroundImg: `#${imgRef.current!.id}`,
                    });
                }}
            />
            <img
                id="underwaterbackground"
                src={Underwater}
                alt="background"
                ref={imgRef2}
                className="images-buffer"
                onLoad={() => {
                    bufferBackgroundImage({
                        idx: 1,
                        backgroundImg: `#${imgRef2.current!.id}`,
                    });
                }}
            />
        </>
    );
};

export default BackgroundView;
