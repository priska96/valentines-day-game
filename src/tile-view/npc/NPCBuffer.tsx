import React, { useRef} from 'react';
import {connect, ConnectedProps} from 'react-redux';
import {ActionCreatorWithPayload} from "@reduxjs/toolkit";

import {NPC_SPRITE, NPC_SPRITE_DEAD} from '../../constants';
import {bufferImage, BufferImageAction, NPC as NPCInterface} from './slices/npcSlice';
import {RootState} from "../../store";


interface NPCProps extends NPCInterface {
    idx: number;
    bufferImage: ActionCreatorWithPayload<BufferImageAction, "npc/bufferImage">;
}
const NPC : React.FC<NPCProps> = ({
                                      id,
                                      dead,
                                      idx,
                                      bufferImage,
                                  }: NPCProps) => {

    const imgRef = useRef<HTMLImageElement>(null);

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
                src={!dead? NPC_SPRITE[id] : NPC_SPRITE_DEAD[id]}
            />
        );
};

const NPCBuffer = (props: PropsFromRedux) => {
    return(
        <div className="npc-imgs-buffer">
            {props.npcs.map((elem, idx)=>{
                return NPC(
                    {
                        ...elem,
                        idx,
                        bufferImage:props.bufferImage,
                    }
                )
            })}
        </div>
    );
}
const mapStateToProps = (state: RootState) => ({...state.npc});

const mapDispatch = {bufferImage};

const connector = connect(mapStateToProps, mapDispatch)

type PropsFromRedux = ConnectedProps<typeof connector>

export default connector(NPCBuffer);
