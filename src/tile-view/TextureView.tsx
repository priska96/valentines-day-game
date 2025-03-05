import React, { useEffect, useRef } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { bufferTextureImage, loadTexture } from './slices/statusSlice';
import Water from '../images/water-texture.png';
import Water2 from '../images/water-texture2.png';
import { RootState } from '../store';

const TextureView: React.FC<PropsFromRedux> = ({
    textureImg,
    bufferTextureImage,
}: PropsFromRedux) => {
    const imgRef = useRef<HTMLImageElement>(null);

    useEffect(() => {
        if (textureImg.length === 2) {
            loadTexture(true);
        }
    }, [textureImg]);

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

const mapStateToProps = (state: RootState) => ({
    textureImg: state.gameStatus.textureImg,
});

const mapDispatch = { bufferTextureImage };
const connector = connect(mapStateToProps, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(TextureView);
