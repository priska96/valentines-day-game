import React, { useEffect, useRef } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { bufferBackgroundImage, loadBackground } from './slices/statusSlice';
import Sky from '../images/sky_background.png';
import Underwater from '../images/underwater_background.png';
import { RootState } from '../store';

const BackgroundView: React.FC<PropsFromRedux> = ({
    backgroundImg,
    bufferBackgroundImage,
    loadBackground,
}: PropsFromRedux) => {
    const imgRef = useRef<HTMLImageElement>(null);
    const imgRef2 = useRef<HTMLImageElement>(null);

    console.log('backgroundImg', backgroundImg);
    useEffect(() => {
        if (backgroundImg.length === 2) {
            console.log('loadBackground');
            loadBackground(true);
        }
    }, [backgroundImg]);

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

const mapStateToProps = (state: RootState) => ({
    backgroundImg: state.gameStatus.backgroundImg,
});

const mapDispatch = { bufferBackgroundImage, loadBackground };
const connector = connect(mapStateToProps, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(BackgroundView);
