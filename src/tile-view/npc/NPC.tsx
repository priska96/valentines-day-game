import React, {useEffect, useContext, useRef} from 'react';
import {connect, ConnectedProps} from 'react-redux';

import CanvasContext from '../canvasContext';
import {NPC_SPRITE, NPC_IMAGE_SIZE, EVIL_KING_DEAD} from '../../constants';
import {TILE_SIZE} from '../constants';
import {bufferImage, BufferImageAction, NPC as NPCInterface} from './slices/npcSlice';
import {loadNPC, LoadNPCAction} from '../slices/statusSlice';
import {RootState} from "../../store";
import {ActionCreatorWithPayload} from "@reduxjs/toolkit";


interface NPCProps extends NPCInterface {
    idx: number;
    loadNPC: ActionCreatorWithPayload<LoadNPCAction, "gameStatus/loadNPC">;
    bufferImage: ActionCreatorWithPayload<BufferImageAction, "npc/bufferImage">;
    currentMap: string
}
const NPC : React.FC<NPCProps> = ({id, x, y ,step=0, dir=0,
                 heroImg,
                 dead,
                 idx,
                 loadNPC, bufferImage,
                 map, currentMap, }: NPCProps) => {
    const ctx = useContext(CanvasContext);
    const imgRef = useRef<HTMLImageElement>(null);
    const currentImgSize = NPC_IMAGE_SIZE[id]

    useEffect(() => {
        if (heroImg && map.includes(currentMap ) && ctx && ctx.map) {
            ctx.map.drawImage(
                document.querySelector(heroImg as any),
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
                        bufferImage({idx: idx, heroImg: `#${imgRef.current!.id}`})
                    }
                }
                className={"images-buffer"}
                src={!dead? NPC_SPRITE[id] : EVIL_KING_DEAD}
            />
        );
};

const NPCS = (props: PropsFromRedux) => {
    return(
        <React.Fragment>
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
        </React.Fragment>
    );
}
const mapStateToProps = (state: RootState) => ({...state.npc, currentMap: state.gameStatus.map, });

const mapDispatch = {bufferImage, loadNPC};

const connector = connect(mapStateToProps, mapDispatch)

type PropsFromRedux = ConnectedProps<typeof connector>

export default connector(NPCS);
