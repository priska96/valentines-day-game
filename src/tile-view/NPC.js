import React, {useEffect, useContext, useRef} from 'react';
import {connect} from 'react-redux';

import CanvasContext from './canvasContext';
import {NPC_SPRITE, NPC_IMAGE_SIZE, EVIL_KING_DEAD} from '../constants';
import {TILE_SIZE} from './constants';
import {bufferImage} from './slices/npcSlice';
import {loadNPC} from './slices/statusSlice';

const NPC = ({id, x, y ,step=0, dir=0,
                 heroImg,
                 dead,
                 idx,
                 loadNPC, bufferImage,
                 map, currentMap, }) => {
    const ctx = useContext(CanvasContext);
    const imgRef = useRef(null);
    const currentImgSize = NPC_IMAGE_SIZE[id]

    useEffect(() => {
        if (heroImg && map.includes(currentMap )) {
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
    }, [ctx, heroImg, x, y, step, dir, loadNPC, currentMap ]);

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
                className={"images-buffer"}
                src={!dead? NPC_SPRITE[id] : EVIL_KING_DEAD}
            />
        );
};

const NPCS = (props) => {
    return(
        <>
            {props.npcs.map((elem, idx)=>{
                return NPC(
                    {
                        ...elem,
                        idx,
                        currentMap: props.currentMap,
                        bufferImage:props.bufferImage,
                        loadNPC: props.loadNPC,
                    }
                )
            })}
        </>
    );
}
const mapStateToProps = (state) => ({...state.npc, currentMap: state.gameStatus.map, });

const mapDispatch = {bufferImage, loadNPC};

export default connect(mapStateToProps, mapDispatch)(NPCS);
