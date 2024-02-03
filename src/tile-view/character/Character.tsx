import React, {useEffect, useContext, useRef} from 'react';
import {connect, ConnectedProps} from 'react-redux';

import {HERO_IMAGE_SIZE, HEROES_SPRITE, HEROES_SPRITE_NAKED} from "../../constants";
import CanvasContext from "../canvasContext";
import {fullyGeared} from "../utils";
import {TILE_SIZE} from "../constants";
import {RootState} from "../../store";
import {loadCharacter} from "../slices/statusSlice";
import {bufferImage} from "./slices/characterSlice";

const Character : React.FC<PropsFromRedux> = ({x, y, step=0, dir=0, heroClass, heroImg, inventory, loadCharacter, bufferImage}:PropsFromRedux) => {
    const ctx = useContext(CanvasContext);
    const imgRef = useRef<HTMLImageElement>(null);

    const img = fullyGeared(inventory) === 3 ? HEROES_SPRITE: HEROES_SPRITE_NAKED

    useEffect(() => {
        if (heroImg && ctx && ctx.hero) {
            ctx.hero.clearRect(0, 0, ctx.hero.canvas.clientWidth, ctx.hero.canvas.clientHeight);
            ctx.hero.drawImage(
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
                () => bufferImage(`#${imgRef.current!.id}`)
            }
            className="images-buffer"
            src={img}
        />
    );
};

const mapStateToProps = (state: RootState) => ({...state.character});

const mapDispatch = {loadCharacter, bufferImage};

const connector = connect(mapStateToProps, mapDispatch)

type PropsFromRedux = ConnectedProps<typeof connector>

export default connector(Character);
