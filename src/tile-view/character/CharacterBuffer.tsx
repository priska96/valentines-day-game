import React, {useEffect, useContext, useRef} from 'react';
import {connect, ConnectedProps} from 'react-redux';

import {HEROES_SPRITE, HERO_IMAGE_SIZE, HEROES_SPRITE_NAKED} from '../../constants';
import {bufferImage} from './slices/characterSlice';
import {loadCharacter} from '../slices/statusSlice';
import {fullyGeared} from "../utils";
import {RootState} from "../../store";

const CharacterBuffer : React.FC<PropsFromRedux> = ({x, y, step=0, dir=0, heroClass, heroImg, inventory, loadCharacter, bufferImage}:PropsFromRedux) => {
    const imgRef = useRef<HTMLImageElement>(null);
    const img = fullyGeared(inventory) === 3 ? HEROES_SPRITE: HEROES_SPRITE_NAKED

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

export default connector(CharacterBuffer);
