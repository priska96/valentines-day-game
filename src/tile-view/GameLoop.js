import React, {useCallback, useEffect, useRef, useState} from 'react';
import {connect} from 'react-redux';

import CanvasContext from './canvasContext';
import {MAP_DIMENSIONS, TILE_SIZE, MOVE_DIRECTIONS} from './constants';
import {onGameEnd} from './slices/statusSlice'
import {addToInventory, move} from './slices/characterSlice'
import {move as moveNPC, fireAction, } from './slices/npcSlice'
import {fireAction as fireActionObject} from './slices/objectSlice'
import {setContents} from '../game-ui/slices/dialogSlice'
import {checkMapCollision, fullyGeared, whoIsOnMap} from './utils';

//import useWalk from "../hooks/use-walk";

const mapDispatch = {move, moveNPC, addToInventory, fireAction, setContents, fireActionObject, onGameEnd};
const mapStateToProps = ({character, npc, objectNPC, dialog}) => ({character, npc, objectNPC, dialog});

const GameLoop = ({
                      children,
                      character,
                      npc,
                      move,
                      moveNPC,
                      objectNPC,
                      fireAction,
                      dialog,
                      setContents,gameStatus,
                      fireActionObject,
                      addToInventory, onGameEnd
                  }) => {
    const canvasRef = useRef(null);
    const [ctx, setCtx] = useState(null);
    const [isVisible, setIsVisible] = useState(true);
    const [isUpdateRequired, setIsUpdateRequired] = useState(false);
    const movesList = ['w', 's', 'a', 'd']
    const loopRef = useRef();
    const width = MAP_DIMENSIONS.COLS * TILE_SIZE;
    const height = MAP_DIMENSIONS.ROWS * TILE_SIZE;
    const moveCharacter = useCallback((e) => {
        const key = e.key//.replace("Arrow","").toLowerCase();
        //console.log(key)
        e.preventDefault();
        if (MOVE_DIRECTIONS[key]) {
            const [x, y] = MOVE_DIRECTIONS[key];
            const collusion = checkMapCollision(character.x + x, character.y + y, [...npc.npcs, ...objectNPC.objects])
            //console.log('is colusion char:', collusion)
            if (collusion === false) {
                setIsUpdateRequired(true);
                move([x, y, key]);
            }
        }
        if (key === "Enter") {
            //debugger
            if (dialog.open) {
                finishAction();
            } else {
                doAction();
            }
        }
    }, [move, character.x, character.y, character.step, character.dir, dialog.open]);

    const tick = useCallback(() => {
        if (isUpdateRequired) {
            setIsVisible(false);
            setIsVisible(true);
            setIsUpdateRequired(false);
        }
        loopRef.current = requestAnimationFrame(tick);
    }, [isUpdateRequired, setIsVisible, setIsUpdateRequired]);

    useEffect(() => {
        setCtx(canvasRef.current.getContext('2d'));
    }, [setCtx]);

    useEffect(() => {
        loopRef.current = requestAnimationFrame(tick);
        return () => {
            loopRef.current && cancelAnimationFrame(loopRef.current);
        }
    }, [loopRef, tick])


    const moveNPC2 = (keyString, idx) => {
        const currentNPC = npc.npcs[idx]
        if (currentNPC.stopMoving) return
        if (MOVE_DIRECTIONS[keyString]) {
            const [x, y] = MOVE_DIRECTIONS[keyString];
            const collusion = checkMapCollision(currentNPC.x + x, currentNPC.y + y, [character, ...objectNPC.objects, ...npc.npcs.filter(npc => npc !== currentNPC)])
            //console.log('is colusion:', collusion)
            if (collusion === false) {
                setIsUpdateRequired(true);
                moveNPC([x, y, keyString, idx]);
            }
        }
    }

    const getRandom = (movesList) => {
        return movesList[Math.floor(Math.random() * movesList.length)]
    }

    useEffect(() => {
        const interval = setInterval(() => {
            moveNPC2(getRandom(movesList),0)
        }, 3000);
        return () => clearInterval(interval);
    }, [npc.npcs[0].x, npc.npcs[0].y, npc.npcs[0].stopMoving]);

    useEffect(() => {
        const interval = setInterval(() => {
            moveNPC2(getRandom(movesList) ,1)
        }, 3000);
        return () => clearInterval(interval);
    }, [npc.npcs[1].x, npc.npcs[1].y, npc.npcs[1].stopMoving]);

    const finishAction = () => {
        console.log("finish action")
        const openerId = dialog.openerId;
        const otherThingIdx = parseInt(openerId.split('-')[1])
        fireAction({idx: otherThingIdx});
        if (npc.npcs[otherThingIdx].stopMoving) {
            setContents({open: false, title: '', text: '', openerId: ''});
            fireAction({idx: otherThingIdx});
        }
        else if (openerId.startsWith('object-')) {
            setIsUpdateRequired(true);
            setContents({open: false, title: '', text: '', openerId: ''});
            fireActionObject({idx: otherThingIdx});
            addToInventory({item: objectNPC.objects[otherThingIdx]})
        }
        else{
            setContents({open: false, title: '', text: '', openerId: ''});
        }
    }
    const doAction = () => {
        console.log("action")
        const otherThing = whoIsOnMap(character.x, character.y, [...npc.npcs, ...objectNPC.objects])
        console.log(otherThing)
        if (!otherThing) return
        if (otherThing.type === 'npc') {
            const otherThingIdx = parseInt(otherThing.id.split('-')[1])
            fireAction({idx: otherThingIdx});
            if (fullyGeared(character.inventory) === 3) {
                onGameEnd({mode: 'battle', winner: undefined})
            } else {
                setContents({
                    open: true,
                    title: "Blue Dragon",
                    text: "Hi, oh mighty hero! Help us free our land and rescue princess Pri~~\n " +
                        "But fist you should find some armor and practice the sword fighting. \nCome back when you found your gear so we can train!",
                    openerId: otherThing.id
                })
            }
        }
        if (otherThing.type === 'objectNPC') {
            if (otherThing.tookItem) {
                setContents({
                    open: true,
                    title: "Nothing!",
                    text: `Here is nothing to take from.`,
                    openerId: otherThing.id
                })
            } else {
                setContents({
                    open: true,
                    title: "Item found!",
                    text: `You found ${otherThing.item}!`,
                    openerId: otherThing.id
                })
            }
        }
    }
    useEffect(() => {
        document.addEventListener('keypress', moveCharacter);
        return () => {
            document.removeEventListener('keypress', moveCharacter);
        }
    }, [moveCharacter]);

    return (
        <CanvasContext.Provider value={ctx}>
            <canvas style={{zIndex: 1}}
                    ref={canvasRef}
                    width={width}
                    height={height}
            />
            {isVisible && children}
        </CanvasContext.Provider>
    );
};

export default connect(mapStateToProps, mapDispatch)(GameLoop);
