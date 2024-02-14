import React, {useEffect, useRef} from 'react';
import {connect, ConnectedProps} from 'react-redux';
import {ActionCreatorWithPayload} from "@reduxjs/toolkit";
import {Layer, Sprite} from "react-konva";
import Konva from "konva"
import {NPC as NPCInterface, move, NPCState} from './slices/npcSlice';
import {loadNPC, LoadNPCAction} from '../slices/statusSlice';
import {RootState} from "../../store";
import {CharacterState} from "../character/slices/characterSlice";
import {ObjectState} from "../objectNPC/slices/objectSlice";
import {setContents} from "../../game-ui/slices/dialogSlice";
import {checkMapCollision, getRandom, movesList} from "../utils";
import {NPC_IMAGE_SIZE} from '../../constants';
import {MOVE_DIRECTIONS, MoveDirectionsInterface} from '../constants';
import {TILE_SIZE} from '../mapImgs';
import {dialogs} from "../dialog_utils";

interface NPCProps extends NPCInterface {
    idx: number;
    loadNPC: ActionCreatorWithPayload<LoadNPCAction, "gameStatus/loadNPC">;
    move: ActionCreatorWithPayload<any[], "npc/move">;
    setContents: ActionCreatorWithPayload<any, "dialog/setContents">,
    currentMap: string,
    character:CharacterState,
    objectNPC: ObjectState,
    allNPC: NPCState

}
const NPC : React.FC<NPCProps> = ({id, x, y ,step=0, dir=0,stopMoving,
                 heroImg,
                 followHero, animate,
                 idx,
                 loadNPC, move,setContents,
                 map, character, objectNPC, currentMap, allNPC}: NPCProps) => {
    const currentImgSize = NPC_IMAGE_SIZE[id]
    const spriteRef = useRef<Konva.Sprite>(null)

    useEffect(() => {
        if(spriteRef && spriteRef.current && animate === "evil-king-fall-down"){
            spriteRef.current.to({
                x: 10*TILE_SIZE, y:12*TILE_SIZE,
                duration : 1,
                onUpdate: () => {
                    spriteRef.current!.rotate(45);
                    },
                onFinish: () => setTimeout(()=> {
                    setContents(dialogs.piscesTown["npc-3"].evilKingFellDown.content)
                    },200
                ),
            });
        }

        if(spriteRef && spriteRef.current && animate === "walk-to-dad"){
            spriteRef.current.to({
                x: 8*TILE_SIZE, y:14*TILE_SIZE,
                duration : 0.3,
                onUpdate: () => {
                    spriteRef.current!.start();
                },
                onFinish: () => {
                    spriteRef.current!.to({
                        x: 8*TILE_SIZE, y:15*TILE_SIZE,
                        duration : 0.3,
                        onUpdate: () => {
                            spriteRef.current!.start();
                        },
                        onFinish: () => {
                            spriteRef.current!.to({
                                x: 7*TILE_SIZE, y:12*TILE_SIZE,
                                duration : 0.8,
                                onUpdate: () => {
                                    spriteRef.current!.start();
                                },
                                onFinish: () => {
                                    spriteRef.current!.stop();
                                    setContents(dialogs.piscesTown["npc-2"].beforeFight.content)
                                },
                            });
                        },
                    });
                },
            });
        }
    }, [animate]);

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
        if(followHero) {
            return;
        }
        const interval = setInterval(() => {
            moveNPC(getRandom(movesList),idx)
        }, 1500);
        return () => clearInterval(interval);
    }, [x, y, stopMoving, followHero]);

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
                        setContents: props.setContents,
                        allNPC:props.allNPC
                    }
                )
            })}
        </Layer>
    );
}
const mapStateToProps = (state: RootState) => ({...state.npc, currentMap: state.gameStatus.map, character: state.character, objectNPC:state.objectNPC, allNPC:state.npc });

const mapDispatch = {loadNPC, move, setContents};

const connector = connect(mapStateToProps, mapDispatch)

type PropsFromRedux = ConnectedProps<typeof connector>

export default connector(NPCKonva);
