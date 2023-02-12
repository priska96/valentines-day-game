import React, {useContext, useEffect, useRef} from 'react';
import { connect } from 'react-redux';
import CanvasContext from './canvasContext';
import {bufferBackgroundImage, loadBackground} from "./slices/statusSlice";
import Sky from "../images/sky_background.png"

const BackgroundView = ({backgroundImg, bufferBackgroundImage}) => {
    const ctx = useContext(CanvasContext);
    const imgRef = useRef(null);

    useEffect(() => {
        console.log('background')
        if(backgroundImg) {
            ctx.drawImage(document.querySelector(backgroundImg), 0, 0);
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
                bufferBackgroundImage(`#${imgRef.current.id}`)
            }
        }
        />
    );
};

const mapStateToProps = (state) => ({backgroundImg: state.gameStatus.backgroundImg});

const mapDispatch = {bufferBackgroundImage};
export default connect(mapStateToProps,mapDispatch)(BackgroundView);
