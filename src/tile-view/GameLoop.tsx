import React, {PropsWithChildren, useCallback, useEffect, useRef, useState} from 'react';
import {connect, ConnectedProps} from 'react-redux';

import CanvasContext from './canvasContext';
import {MAP_DIMENSIONS, TILE_SIZE, MOVE_DIRECTIONS, MoveDirectionsInterface} from './constants';
import {onGameEnd, changeMap} from './slices/statusSlice'
import {addToInventory, move, updatePlayerPosition} from './character/slices/characterSlice'
import {move as moveNPC, fireAction, updateNPC,} from './npc/slices/npcSlice'
import {fireAction as fireActionObject, ObjectNPC, updateObject} from './objectNPC/slices/objectSlice'
import {setContents} from '../game-ui/slices/dialogSlice'
import {checkMapCollision, fullyGeared, getRandom, movesList, whoIsOnMap} from './utils';
import {dialogs} from "./dialog_utils";
import {battleEvilKind, enterDungeon, gameOver, gameWon, goToSky, leaveDungeon, victory} from "./action_utils";
import {RootState} from "../store";


const GameLoop: React.FC<PropsWithChildren<PropsFromRedux>> = ({
                      children,
                      character,
                      npc,
                      move,
                      moveNPC,
                      objectNPC,
                      fireAction,
                      dialog,
                      setContents,map, winner,
                      fireActionObject,
                      addToInventory, onGameEnd, changeMap, updateNPC, updatePlayerPosition, updateObject
                  }:PropsWithChildren<PropsFromRedux>) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const canvasRef2 = useRef<HTMLCanvasElement>(null);
    const [ctx, setCtx] = useState<{ map: CanvasRenderingContext2D|null, hero: CanvasRenderingContext2D|null  }|null>(null);
    const [isVisible, setIsVisible] = useState(true);
    const [isUpdateRequired, setIsUpdateRequired] = useState(false);

    const loopRef = useRef<number>();
    const width = MAP_DIMENSIONS.COLS * TILE_SIZE;
    const height = MAP_DIMENSIONS.ROWS * TILE_SIZE;

    const moveCharacter = useCallback((e: KeyboardEvent) => {
        const key = e.key

        e.preventDefault();
        if (MOVE_DIRECTIONS[key  as keyof MoveDirectionsInterface]) {
            const [x, y] = MOVE_DIRECTIONS[key  as keyof MoveDirectionsInterface];
            const collusion = checkMapCollision(
                character.x + x,
                character.y + y,
                [
                    ...npc.npcs,
                    ...objectNPC.objects
                ],
                map
            )
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
        if(key === 'm'){
            changeMap('sky');
            updateNPC({idx:[2,1],'data-1':{ x:8 ,y: 3, stopMoving:true},'data-2':{ x:3 ,y: 13}})
        }
    }, [move, character.x, character.y, character.step, character.dir, dialog.open]);

    const tick = useCallback( () => {
        if (isUpdateRequired) {
             setIsVisible(false);
             setIsVisible(true);
             setIsUpdateRequired(false);
        }
        loopRef.current = requestAnimationFrame(tick);
    }, [isUpdateRequired, setIsVisible, setIsUpdateRequired]);

    useEffect(() => {
        console.log("if canvas", canvasRef.current)
        const canvas = canvasRef.current;
        const canvas2 = canvasRef2.current;
        if (canvas == null && canvas2 == null ) return; // current may be null
        if(canvasRef.current && canvasRef2.current ) {
            console.log("Set canvases")
            setCtx({ map: canvasRef.current.getContext('2d'), hero: canvasRef2.current.getContext('2d') });
        }
    }, [canvasRef.current,canvasRef2.current, setCtx]);

    useEffect(() => {
        loopRef.current = requestAnimationFrame(tick);
        return () => {
            loopRef.current && cancelAnimationFrame(loopRef.current);
        }
    }, [loopRef, tick])


    const moveNPC2 = (keyString: string, idx: number) => {
        const currentNPC = npc.npcs[idx]
        if (currentNPC.stopMoving) return
        if (MOVE_DIRECTIONS[keyString as keyof MoveDirectionsInterface]) {
            const [x, y] = MOVE_DIRECTIONS[keyString as keyof MoveDirectionsInterface];
            const collusion = checkMapCollision(
                currentNPC.x + x,
                currentNPC.y + y,
                [
                    character,
                    ...objectNPC.objects,
                    ...npc.npcs.filter(npc => npc !== currentNPC)
                ],
                map
            )
            //console.log('is colusion:', collusion)
            if (collusion === false) {
                setIsUpdateRequired(true);
                moveNPC([x, y, keyString, idx]);
            }
        }
    }


    useEffect(() => {
        const interval = setInterval(() => {
            moveNPC2(getRandom(movesList),0)
        }, 1500);
        return () => clearInterval(interval);
    }, [npc.npcs[0].x, npc.npcs[0].y, npc.npcs[0].stopMoving]);

    useEffect(() => {
        if(map ==="evilKing"){
            const interval = setInterval(() => {
                moveNPC2(getRandom(movesList), 1)
            }, 1500);
            return () => clearInterval(interval);
        }
    }, [npc.npcs[1].x, npc.npcs[1].y, npc.npcs[1].stopMoving, map]);

    useEffect(() => {
        if(map==="evilKing"){
            const interval = setInterval(() => {
                moveNPC2(getRandom(movesList), 2)
            }, 1500);
            return () => clearInterval(interval);
        }
    }, [npc.npcs[2].x, npc.npcs[2].y, npc.npcs[2].stopMoving, map]);

    const finishAction = () => {
        console.log("finish action")
        const openerId = dialog.openerId;
        const otherThingIdx = parseInt(openerId.split('-')[1])
        if(enterDungeon(openerId, otherThingIdx, dialog.action,setContents, setIsUpdateRequired, changeMap, updatePlayerPosition, updateNPC, updateObject)){
            return;
        }
        else if(goToSky(dialog.action,setContents, setIsUpdateRequired, changeMap, updatePlayerPosition, updateNPC)){
            return;
        }
        else if(battleEvilKind(dialog.action, otherThingIdx, setContents, onGameEnd)){
            return;
        }
        else if(gameOver(dialog.action, otherThingIdx, setContents, onGameEnd)){
            return;
        }
        else if(victory(dialog.action, otherThingIdx, setContents, setIsUpdateRequired, fireActionObject, updateNPC)){
            return;
        }
        else if(leaveDungeon(openerId, otherThingIdx, dialog.action, setContents, setIsUpdateRequired, changeMap, updatePlayerPosition, updateNPC)){
            return;
        }
        else if(gameWon(dialog.action, otherThingIdx, setContents, onGameEnd)){
            return;
        }

        if (openerId.startsWith('npc-') && npc.npcs[otherThingIdx].stopMoving) {
            setContents({open: false, title: '', text: '', openerId: '', action: ''});
            fireAction({idx: otherThingIdx});
        }
        else if (openerId.startsWith('object-')) {
            setIsUpdateRequired(true);
            const prevTitle = dialog.title

            setContents({open: false, title: '', text: '', openerId: '', action: ''});
            fireActionObject({idx: otherThingIdx});
            if( prevTitle!== 'Nothing!') addToInventory({item: objectNPC.objects[otherThingIdx]})
        }
        else{
            setContents({open: false, title: '', text: '', openerId: '', action: ''});
        }
    }
    const doAction = () => {
        console.log("action")
        if(map ==='sky' && character.x === 5 && character.y === 6 ){
            setContents(dialogs.sky["npc-0"].enterDungeon.content)
        }
        const otherThing = whoIsOnMap(character.x, character.y, [...npc.npcs, ...objectNPC.objects])
        console.log(otherThing)
        if (!otherThing) return
        if (otherThing.type === 'npc') {
            const otherThingIdx = parseInt(otherThing.id.split('-')[1])
            fireAction({idx: otherThingIdx});
            if(map === 'forest') {
                if (fullyGeared(character.inventory) === 3) {
                    if (winner === undefined || winner === 'Blue Dragon') {
                        setContents(dialogs.forest[otherThing.id].beforeFight.afterGear!.content)
                        setTimeout(()=> {
                            onGameEnd({mode: 'battle', winner: undefined, selectedOpponentIdx: otherThingIdx})
                            },500
                        )}
                    if (winner === 'Jihoon') {
                        setContents(dialogs.forest[otherThing.id].afterFight.goToSky!.content)
                    }
                } else {
                    setContents(dialogs.forest[otherThing.id].beforeFight.beforeGear!.content)
                }
            }
            if(map==='evilKing') {
                setContents(dialogs.evilKing[otherThing.id].afterVictory.content)
            }
        }
        if (otherThing.type === 'objectNPC') {
            if ((otherThing as ObjectNPC).tookItem) {
                setContents({
                    open: true,
                    title: "Nothing!",
                    text: `Here is nothing to take from.`,
                    openerId: otherThing.id,
                    action: ''
                })
            } else {
                setContents({
                    open: true,
                    title: "Item found!",
                    text: `You found ${(otherThing as ObjectNPC).item}!`,
                    openerId: otherThing.id,
                    action: ''
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
                    id={'playerCanvas'}
            />
            <canvas style={{zIndex: 2, display:"none",position:"absolute", left:"calc(calc(100vw - 270px) / 2)"}}
                    ref={canvasRef2}
                    width={width}
                    height={height}
                    id={'playerCanvas'}
            />
            {isVisible && children}
        </CanvasContext.Provider>
    );
};
const mapDispatch = {move, moveNPC, addToInventory, fireAction, setContents, fireActionObject, onGameEnd, changeMap, updateNPC , updatePlayerPosition, updateObject };
const mapStateToProps = ({character, npc, objectNPC, dialog, gameStatus}: RootState) => ({character, npc, objectNPC, dialog, map:gameStatus.map, winner: gameStatus.winner});

const connector = connect(mapStateToProps, mapDispatch)

type PropsFromRedux = ConnectedProps<typeof connector>

export default connector(GameLoop);
