import React, {useRef} from 'react';
import {connect, ConnectedProps} from 'react-redux';
import {ActionCreatorWithPayload} from "@reduxjs/toolkit";

import {RootState} from "../../store";
import {bufferImage, BufferImageAction} from './slices/objectSlice';
import {OBJECT_NPC_SPRITE} from '../../constants';

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
}

const ObjectNPC: React.FC<ObjectNPCProps> = ({
                                                 id, x, y,
                                                 idx,
                                                 bufferImage,
                                                 tookItem
                                             }: ObjectNPCProps) => {

    const imgRef = useRef<HTMLImageElement>(null);

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


const ObjectNPCBuffer = (props: PropsFromRedux) => {
    return(
        <div className="object-npc-imgs-buffer">
            {props.objects.map((elem, idx)=>{
               return ObjectNPC({
                   ...elem,
                   idx,
                   bufferImage:props.bufferImage
               })
            })}
        </div>
    );
};

const mapStateToProps = (state: RootState) => ({...state.objectNPC});

const mapDispatch = {bufferImage};

const connector = connect(mapStateToProps, mapDispatch)

type PropsFromRedux = ConnectedProps<typeof connector>

export default connector(ObjectNPCBuffer);