import React, {useEffect, useContext, useRef} from 'react';
import {connect} from 'react-redux';

import CanvasContext from './canvasContext';
import {HEROES_SPRITE, HERO_IMAGE_SIZE, HEROES_SPRITE_NAKED} from '../constants';
import {TILE_SIZE} from './constants';
import {bufferImage} from './slices/characterSlice';
import {loadCharacter} from './slices/statusSlice';
import {fullyGeared} from "./utils";

const Character = ({x, y, step=0, dir=0, heroClass, heroImg, inventory, loadCharacter, bufferImage}) => {
    const ctx = useContext(CanvasContext);
    const imgRef = useRef(null);

    const img = fullyGeared(inventory) === 3 ? HEROES_SPRITE: HEROES_SPRITE_NAKED

    useEffect(() => {
        if (heroImg) {
            ctx.drawImage(
                document.querySelector(heroImg),
                step* HERO_IMAGE_SIZE,
                dir* HERO_IMAGE_SIZE,
                HERO_IMAGE_SIZE,
                HERO_IMAGE_SIZE ,
                x * TILE_SIZE,
                y * TILE_SIZE,
                HERO_IMAGE_SIZE,
                HERO_IMAGE_SIZE,
            );
            loadCharacter(true);
        }
        return ()=>{}
    }, [ctx, heroClass, heroImg, x, y, step, dir, loadCharacter, inventory]);

    return (
        <img
            id="character" 
            alt="character"
            ref={imgRef} 
            onLoad={
                () => bufferImage(`#${imgRef.current.id}`)
            }
            className="images-buffer"
            src={img}
        />
    );
};

const mapStateToProps = (state) => ({...state.character});

const mapDispatch = {loadCharacter, bufferImage};

export default connect(mapStateToProps, mapDispatch)(Character);
