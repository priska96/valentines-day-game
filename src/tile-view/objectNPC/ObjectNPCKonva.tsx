import React, {useEffect} from 'react';
import {connect, ConnectedProps} from 'react-redux';
import {ActionCreatorWithPayload} from "@reduxjs/toolkit";
import {Layer, Sprite} from "react-konva";

import {TILE_SIZE} from '../mapImgs';
import {loadObject, LoadObjectAction} from '../slices/statusSlice';
import {RootState} from "../../store";

interface ObjectNPCProps {
    id: string;
    x: number;
    y: number;
    item: string;
    objectImg: any;
    type: string;
    map: string[];
    healing: number;
    idx: number;
    loadObject: ActionCreatorWithPayload<LoadObjectAction, "gameStatus/loadObject">;
    currentMap: string
}

const ObjectNPC: React.FC<ObjectNPCProps> = ({ x, y, objectImg, map, idx,  loadObject, currentMap}: ObjectNPCProps) => {

    useEffect(() => {
        if (objectImg && map.includes(currentMap ) ) {
            loadObject({idx: idx, val:true});
        }

    }, [loadObject, map, objectImg, currentMap]);

    return objectImg && map.includes(currentMap)? (
        <Sprite
            key={idx}
            x={x * TILE_SIZE}//horizontal position
            y={y * TILE_SIZE}//vertical position
            animation={"0"}
            animations={
                {
                    '0': [
                        0* TILE_SIZE,0* TILE_SIZE,TILE_SIZE,TILE_SIZE,
                    ],
                }
            }
            frameRate={0}
            frameIndex={0}
            image={document.querySelector(objectImg) as HTMLImageElement}
        />) : null;
};


const ObjectNPCKonva = (props: PropsFromRedux) => {
    return(
        <Layer>
            {props.objects.map((elem, idx)=>{
               return ObjectNPC({...elem, idx, loadObject: props.loadObject, currentMap: props.currentMap})
            })}
        </Layer>
    );
};

const mapStateToProps = (state: RootState) => ({...state.objectNPC, currentMap: state.gameStatus.map,});

const mapDispatch = {loadObject};

const connector = connect(mapStateToProps, mapDispatch)

type PropsFromRedux = ConnectedProps<typeof connector>

export default connector(ObjectNPCKonva);