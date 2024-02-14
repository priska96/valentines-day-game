import React, {useEffect, useRef} from 'react';
import {connect, ConnectedProps} from 'react-redux';
import {bufferBackgroundImage, loadBackground} from "./slices/statusSlice";
import Sky from "../images/sky_background.png"
import {RootState} from "../store";

const BackgroundView: React.FC<PropsFromRedux> = ({backgroundImg, bufferBackgroundImage}: PropsFromRedux) => {
    const imgRef = useRef<HTMLImageElement>(null);

    useEffect(() => {
        if(backgroundImg ) {
            loadBackground(true);
        }
    }, [backgroundImg])

    return (
        <img
            id="skybackground"
            src={Sky}
            alt='background'
            ref={imgRef}
            className="images-buffer"
            onLoad={
            () => {
                bufferBackgroundImage(`#${imgRef.current!.id}`)
            }
        }
        />
    );
};

const mapStateToProps = (state: RootState) => ({backgroundImg: state.gameStatus.backgroundImg});

const mapDispatch = {bufferBackgroundImage};
const connector = connect(mapStateToProps, mapDispatch)

type PropsFromRedux = ConnectedProps<typeof connector>

export default connector(BackgroundView);
