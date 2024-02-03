import React, {useEffect, useContext, useRef} from 'react';
import {connect, ConnectedProps} from 'react-redux';

import CanvasContext from '../canvasContext';
import {OBJECT_NPC_SPRITE} from '../../constants';
import {TILE_SIZE} from '../constants';
import {bufferImage, BufferImageAction} from './slices/objectSlice';
import {loadObject, LoadObjectAction} from '../slices/statusSlice';
import {RootState} from "../../store";
import {ActionCreatorWithPayload} from "@reduxjs/toolkit";

interface ObjectNPCProps {
    id: string;
    x: number;
    y: number;
    item: string;
    objectImg: any;
    type: string;
    map: string[];
    tookItem: boolean;
    healing: number;
    idx: number;
    bufferImage: ActionCreatorWithPayload<BufferImageAction, "objectNPC/bufferImage">
    loadObject: ActionCreatorWithPayload<LoadObjectAction, "gameStatus/loadObject">;
    currentMap: string
}

const ObjectNPC: React.FC<ObjectNPCProps> = ({id, x, y, objectImg, map, idx,  loadObject, bufferImage, tookItem, currentMap}: ObjectNPCProps) => {
    const ctx = useContext(CanvasContext);
    const imgRef = useRef<HTMLImageElement>(null);
console.log(("objectfsd npc"))
    useEffect(() => {
        if (objectImg && map.includes(currentMap ) && ctx && ctx.map) {
            ctx.map.drawImage(
                document.querySelector(objectImg),
                0* 32,
                0* 32,
                32,
                32 ,
                x * TILE_SIZE,
                y * TILE_SIZE,
                32,
                32,
            );
            loadObject({idx: idx, val:true});
        }
        return ()=>{}
    }, [ctx, loadObject, tookItem, currentMap]);

    return (
        <img
            key={id}
            id={id}
            alt="objectNPC"
            ref={imgRef}
            onLoad={
                () => {
                    bufferImage({idx: idx, objectImg: `#${imgRef.current!.id}`})
                }
            }
            className="images-buffer"
            src={!tookItem?  OBJECT_NPC_SPRITE[id][0] :  OBJECT_NPC_SPRITE[id][1]}
        />
    );
};


const ObjectNPCs = (props: PropsFromRedux) => {
    return(
        <div>
            {props.objects.map((elem, idx)=>{
               return ObjectNPC({...elem, idx, bufferImage:props.bufferImage, loadObject: props.loadObject, currentMap: props.currentMap})
            })}
        </div>
    );
};

const mapStateToProps = (state: RootState) => ({...state.objectNPC, currentMap: state.gameStatus.map,});

const mapDispatch = {loadObject, bufferImage};

const connector = connect(mapStateToProps, mapDispatch)

type PropsFromRedux = ConnectedProps<typeof connector>

export default connector(ObjectNPCs);