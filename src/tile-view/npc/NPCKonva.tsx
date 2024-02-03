import React, {useEffect, useRef} from 'react';
import {connect, ConnectedProps} from 'react-redux';
import {ActionCreatorWithPayload} from "@reduxjs/toolkit";
import {Layer, Sprite} from "react-konva";

import {NPC as NPCInterface, move, NPCState} from './slices/npcSlice';
import {loadNPC, LoadNPCAction} from '../slices/statusSlice';
import {RootState} from "../../store";
import {CharacterState} from "../character/slices/characterSlice";
import {ObjectState} from "../objectNPC/slices/objectSlice";
import {checkMapCollision, getRandom, movesList} from "../utils";
import {NPC_IMAGE_SIZE} from '../../constants';
import {MOVE_DIRECTIONS, MoveDirectionsInterface, TILE_SIZE} from '../constants';

interface NPCProps extends NPCInterface {
    idx: number;
    loadNPC: ActionCreatorWithPayload<LoadNPCAction, "gameStatus/loadNPC">;
    move: ActionCreatorWithPayload<any[], "npc/move">;
    currentMap: string,
    character:CharacterState,
    objectNPC: ObjectState,
    allNPC: NPCState

}
const NPC : React.FC<NPCProps> = ({id, x, y ,step=0, dir=0,stopMoving,
                 heroImg,
                 dead,
                 idx,
                 loadNPC, move,
                 map, character, objectNPC, currentMap, allNPC}: NPCProps) => {
    const currentImgSize = NPC_IMAGE_SIZE[id]
    const spriteRef = useRef<any>(null)

    useEffect(() => {
        if(heroImg && map.includes(currentMap )){
            loadNPC({idx: idx, val:true});
        }
    }, []);


    const moveNPC = (keyString: string, idx: number) => {
        if (stopMoving) return
        if (MOVE_DIRECTIONS[keyString as keyof MoveDirectionsInterface]) {
            const [xDir, yDir] = MOVE_DIRECTIONS[keyString as keyof MoveDirectionsInterface];
            const collusion = checkMapCollision(
                x + xDir,
                y + yDir,
                [
                    character,
                    ...objectNPC.objects,
                    ...allNPC.npcs.filter(npc => npc.id !== id)
                ],
                currentMap
            )
            if (!collusion) {
                move([xDir, yDir, keyString, idx]);
            }
        }
    }

    useEffect(() => {
        const interval = setInterval(() => {
            moveNPC(getRandom(movesList),0)
        }, 1500);
        return () => clearInterval(interval);
    }, [x, y, stopMoving]);

    return heroImg && map.includes(currentMap)? (
        <Sprite
            key={idx}
            ref={spriteRef}
            x={x * TILE_SIZE}//horizontal position
            y={y * TILE_SIZE}//vertical position
            animation={dir.toString()}
            animations={
                {
                    '0': [
                        0* currentImgSize,0* currentImgSize,currentImgSize,currentImgSize,
                        1* currentImgSize,0* currentImgSize,currentImgSize,currentImgSize,
                        2* currentImgSize,0* currentImgSize,currentImgSize,currentImgSize
                    ],
                    '1': [
                        0* currentImgSize,1* currentImgSize,currentImgSize,currentImgSize,
                        1* currentImgSize,1* currentImgSize,currentImgSize,currentImgSize,
                        2* currentImgSize,1* currentImgSize,currentImgSize,currentImgSize
                    ],
                    '2': [
                        0* currentImgSize,2* currentImgSize,currentImgSize,currentImgSize,
                        1* currentImgSize,2* currentImgSize,currentImgSize,currentImgSize,
                        2* currentImgSize,2* currentImgSize,currentImgSize,currentImgSize
                    ],
                    '3': [
                        0* currentImgSize,3* currentImgSize,currentImgSize,currentImgSize,
                        1* currentImgSize,3* currentImgSize,currentImgSize,currentImgSize,
                        2* currentImgSize,3* currentImgSize,currentImgSize,currentImgSize
                    ]
                }
            }
            frameRate={3}
            frameIndex={step}
            image={document.querySelector(heroImg) as HTMLImageElement}
        />

        ) : null;
};

const NPCKonva = (props: PropsFromRedux) => {
    return(
        <Layer>
            {props.npcs.map((elem, idx)=>{
                return NPC(
                    {
                        ...elem,
                        idx,
                        currentMap: props.currentMap,
                        loadNPC: props.loadNPC,
                        character: props.character,
                        objectNPC:props.objectNPC,
                        move: props.move,
                        allNPC:props.allNPC
                    }
                )
            })}
        </Layer>
    );
}
const mapStateToProps = (state: RootState) => ({...state.npc, currentMap: state.gameStatus.map, character: state.character, objectNPC:state.objectNPC, allNPC:state.npc });

const mapDispatch = {loadNPC, move};

const connector = connect(mapStateToProps, mapDispatch)

type PropsFromRedux = ConnectedProps<typeof connector>

export default connector(NPCKonva);
