import React, {useEffect, useRef, useCallback, useState} from 'react';
import {connect, ConnectedProps} from 'react-redux';
import {Sprite} from "react-konva";

import {RootState} from "../../store";
import {addToInventory, move, updatePlayerPosition} from './slices/characterSlice';
import {changeMap, loadCharacter, onGameEnd} from '../slices/statusSlice';
import {HERO_IMAGE_SIZE} from "../../constants";
import {MOVE_DIRECTIONS, MoveDirectionsInterface, TILE_SIZE} from "../constants";
import {checkMapCollision} from "../utils";
import {fireAction, updateNPC} from "../npc/slices/npcSlice";
import {doAction, finishAction} from "./dialogActions";
import {setContents} from "../../game-ui/slices/dialogSlice";
import {updateObject, fireAction as fireActionObject} from "../objectNPC/slices/objectSlice";

const CharacterKonva : React.FC<PropsFromRedux> = (
    {x, y, step=0, dir=0,
        heroClass,
        heroImg,
        playerSummary,
        inventory,portrait,
        npc, objectNPC,
        map,
        dialog,
        winner,
        move,
        loadCharacter,
        changeMap,updateNPC,
        setContents,
        fireAction,
        onGameEnd,
        updatePlayerPosition,
        updateObject,
        fireActionObject,
        addToInventory
        }:PropsFromRedux) => {
const spriteRef = useRef<any>(null)
    const [isUpdateRequired, setIsUpdateRequired] = useState(false);

    useEffect(() => {
        if(heroImg){
            loadCharacter(true);
        }
    }, []);


    const moveCharacter = useCallback((e: KeyboardEvent) => {
        const key = e.key
        // if(spriteRef.current){
        //     spriteRef.current.start();
        // }
        console.log(key, step)
        e.preventDefault();
        if (MOVE_DIRECTIONS[key as keyof MoveDirectionsInterface]) {
            const [xDir, yDir] = MOVE_DIRECTIONS[key as keyof MoveDirectionsInterface];
            const collusion = checkMapCollision(
                x + xDir,
                y + yDir,
                [
                    ...npc.npcs,
                    ...objectNPC.objects
                ],
                map
            )
            if (!collusion) {
                console.log("collusion", collusion)
                move([xDir, yDir, key]);
            }
        }

        if (key === "Enter") {
            debugger
            if (dialog.open) {
                finishAction(
                    dialog,
                    npc,
                    objectNPC,
                    setIsUpdateRequired,
                    setContents,
                    fireAction,
                    onGameEnd,
                    changeMap,
                    updatePlayerPosition,
                    updateNPC,
                    updateObject,
                    fireActionObject,
                    addToInventory
            );
            } else {
                doAction(
                    map,
                    {x, y, step, dir,
                    heroClass,
                    heroImg,
                    playerSummary,
                    inventory, portrait},
                    npc, objectNPC, winner,
                setContents,
                    fireAction,
                    onGameEnd);
            }
        }
        if(key === 'm'){
            changeMap('sky');
            updateNPC({idx:[2,1],'data-1':{ x:8 ,y: 3, stopMoving:true},'data-2':{ x:3 ,y: 13}})
        }
    },[spriteRef, move, x, y, step, dir, dialog])

    useEffect(() => {
        document.addEventListener('keypress', moveCharacter);
        return () => {
            document.removeEventListener('keypress', moveCharacter);
        }
    }, [moveCharacter]);

    return heroImg && (
        <Sprite
            ref={spriteRef}
            x={x * TILE_SIZE}//horizontal position
            y={y * TILE_SIZE}//vertical position
            animation={dir.toString()}
            animations={
                {
                    '0': [
                        0* HERO_IMAGE_SIZE,0* HERO_IMAGE_SIZE,HERO_IMAGE_SIZE,HERO_IMAGE_SIZE,
                        1* HERO_IMAGE_SIZE,0* HERO_IMAGE_SIZE,HERO_IMAGE_SIZE,HERO_IMAGE_SIZE,
                        2* HERO_IMAGE_SIZE,0* HERO_IMAGE_SIZE,HERO_IMAGE_SIZE,HERO_IMAGE_SIZE
                    ],
                    '1': [
                        0* HERO_IMAGE_SIZE,1* HERO_IMAGE_SIZE,HERO_IMAGE_SIZE,HERO_IMAGE_SIZE,
                        1* HERO_IMAGE_SIZE,1* HERO_IMAGE_SIZE,HERO_IMAGE_SIZE,HERO_IMAGE_SIZE,
                        2* HERO_IMAGE_SIZE,1* HERO_IMAGE_SIZE,HERO_IMAGE_SIZE,HERO_IMAGE_SIZE
                    ],
                    '2': [
                        0* HERO_IMAGE_SIZE,2* HERO_IMAGE_SIZE,HERO_IMAGE_SIZE,HERO_IMAGE_SIZE,
                        1* HERO_IMAGE_SIZE,2* HERO_IMAGE_SIZE,HERO_IMAGE_SIZE,HERO_IMAGE_SIZE,
                        2* HERO_IMAGE_SIZE,2* HERO_IMAGE_SIZE,HERO_IMAGE_SIZE,HERO_IMAGE_SIZE
                    ],
                    '3': [
                        0* HERO_IMAGE_SIZE,3* HERO_IMAGE_SIZE,HERO_IMAGE_SIZE,HERO_IMAGE_SIZE,
                        1* HERO_IMAGE_SIZE,3* HERO_IMAGE_SIZE,HERO_IMAGE_SIZE,HERO_IMAGE_SIZE,
                        2* HERO_IMAGE_SIZE,3* HERO_IMAGE_SIZE,HERO_IMAGE_SIZE,HERO_IMAGE_SIZE
                    ]
                }
            }
            frameRate={3}
            frameIndex={step}
            image={document.querySelector(heroImg)}
        />
    );
};

const mapStateToProps = (state: RootState) => (
    {
        ...state.character,
        npc: state.npc,
        objectNPC: state.objectNPC,
        map: state.gameStatus.map,
        winner: state.gameStatus.winner,
        dialog: state.dialog
    });

const mapDispatch = {
    loadCharacter,
    move,
    changeMap,
    updateNPC,
    setContents,
    fireAction,
    onGameEnd,
    updatePlayerPosition,
    updateObject,
    fireActionObject,
    addToInventory
};

const connector = connect(mapStateToProps, mapDispatch)

type PropsFromRedux = ConnectedProps<typeof connector>

export default connector(CharacterKonva);
