import React, {useEffect, useContext, useRef} from 'react';
import {connect} from 'react-redux';

import CanvasContext from './canvasContext';
import {NPC_SPRITE, NPC_IMAGE_SIZE} from '../constants';
import {TILE_SIZE} from './constants';
import {bufferImage} from './slices/npcSlice';
import {loadNPC} from './slices/statusSlice';

const NPC = ({x,y ,step=0, dir=0, heroClass, heroImg, idx, loadNPC, bufferImage, id, randomMove}) => {
    const ctx = useContext(CanvasContext);
    const imgRef = useRef(null);
    const currentImgSize = NPC_IMAGE_SIZE[id]
    useEffect(() => {
        if (heroImg) {
            ctx.drawImage(
                document.querySelector(heroImg),
                step* currentImgSize,
                dir* currentImgSize,
                currentImgSize,
                currentImgSize ,
                (x * TILE_SIZE),
                (y * TILE_SIZE),
                currentImgSize,
                currentImgSize,
            );
            loadNPC({idx: idx, val:true});
        }
        return ()=>{}
    }, [ctx, heroClass, heroImg, x, y, step, dir, loadNPC, randomMove]);


    return (
        <img
            key={id}
            id={id}
            alt="npc"
            ref={imgRef} 
            onLoad={
                () => {
                    bufferImage({idx: idx, heroImg: `#${imgRef.current.id}`})
                }
            }
            className="images-buffer"
            src={NPC_SPRITE[id]}
        />
    );
};

const NPCS = (props) => {
    return(
        <div>
            {props.npcs.map((elem, idx)=>{
                return NPC({...elem, idx, bufferImage:props.bufferImage, loadNPC: props.loadNPC})
            })}
        </div>
    );
}
const mapStateToProps = (state) => ({...state.npc});

const mapDispatch = {loadNPC, bufferImage};

export default connect(mapStateToProps, mapDispatch)(NPCS);
