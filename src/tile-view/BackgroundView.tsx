import React, {useContext, useEffect, useRef} from 'react';
import {connect, ConnectedProps} from 'react-redux';
import CanvasContext from './canvasContext';
import {bufferBackgroundImage, loadBackground} from "./slices/statusSlice";
import Sky from "../images/sky_background.png"
import {RootState} from "../store";

const BackgroundView: React.FC<PropsFromRedux> = ({backgroundImg, bufferBackgroundImage}: PropsFromRedux) => {
    const ctx = useContext(CanvasContext);
    console.log("bg", ctx)
    const imgRef = useRef<HTMLImageElement>(null);

    useEffect(() => {
        console.log('background')
        if(backgroundImg && ctx && ctx.map) {
            ctx.map.drawImage(document.querySelector(backgroundImg), 0, 0);
        }
        loadBackground(true);
    }, [ctx, backgroundImg])

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

// The inferred type will look like:
// {isOn: boolean, toggleOn: () => void}
type PropsFromRedux = ConnectedProps<typeof connector>

export default connector(BackgroundView);
