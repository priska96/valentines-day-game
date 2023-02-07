import React, {useCallback, useEffect, useRef, useState} from 'react';
import {connect} from 'react-redux';

import NPCCanvasContext from './npccanvasContext';
import {MAP_DIMENSIONS, TILE_SIZE, MOVE_DIRECTIONS} from './constants';
import {move, } from './slices/npcSlice'
import {checkMapCollision} from './utils';
import {NPC_SPRITE} from "../constants";

//import useWalk from "../hooks/use-walk";

const mapDispatch = {move};
const mapStateToProps = ({character, npc, objectNPC, gameStatus}) => ({character, npc, objectNPC, map:gameStatus.map});

const NPCLoop = ({
                      children,
                      character,
                      npc,
                      move,
                      objectNPC,map,
                  }) => {
    const canvasRef = useRef(null);
    const [ctx, setCtx] = useState(null);
    const [isVisible, setIsVisible] = useState(true);
    const [isUpdateRequired, setIsUpdateRequired] = useState(false);
    const movesList = ['w', 's', 'a', 'd']
    const loopRef = useRef();
    const width = MAP_DIMENSIONS.COLS * TILE_SIZE;
    const height = MAP_DIMENSIONS.ROWS * TILE_SIZE;

    const moveNPC = (keyString, idx) => {
        const currentNPC = npc.npcs[idx]
        if (currentNPC.stopMoving) return
        if (MOVE_DIRECTIONS[keyString]) {
            const [x, y] = MOVE_DIRECTIONS[keyString];
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
                move([x, y, keyString, idx]);
            }
        }
    }

    const getRandom = (movesList) => {
        return movesList[Math.floor(Math.random() * movesList.length)]
    }


    useEffect(() => {
        const interval = setInterval(() => {
            moveNPC(getRandom(movesList),0)
        }, 7000);
        return () => clearInterval(interval);
    }, [npc.npcs[0].x, npc.npcs[0].y, npc.npcs[0].stopMoving]);
    const tick = useCallback(() => {
        if (isUpdateRequired) {
            setIsVisible(false);
            setIsVisible(true);
            setIsUpdateRequired(false);
        }
        loopRef.current = window.requestAnimationFrame(tick);
    }, [isUpdateRequired, setIsVisible, setIsUpdateRequired]);

    useEffect(() => {
        setCtx(canvasRef.current.getContext('2d'));
    }, [setCtx]);

    useEffect(() => {
        loopRef.current = window.requestAnimationFrame(tick);
        return () => {
            loopRef.current && window.cancelAnimationFrame(loopRef.current);
        }
    }, [loopRef, tick])


    // useEffect(() => {
    //     if(map ==="evilKing"){
    //         const interval = setInterval(() => {
    //             moveNPC(getRandom(movesList), 1)
    //         }, 3000);
    //         return () => clearInterval(interval);
    //     }
    // }, [npc.npcs[1].x, npc.npcs[1].y, npc.npcs[1].stopMoving, map]);
    //
    // useEffect(() => {
    //     if(map==="evilKing"){
    //         const interval = setInterval(() => {
    //             moveNPC(getRandom(movesList), 2)
    //         }, 3000);
    //         return () => clearInterval(interval);
    //     }
    // }, [npc.npcs[2].x, npc.npcs[2].y, npc.npcs[2].stopMoving, map]);

    //console.log('isVisible',isVisible)


    return (
        <NPCCanvasContext.Provider value={ctx}>
            <canvas style={{zIndex: 2, }}
                    ref={canvasRef}
                    width={width}
                    height={height}
                    id={'npcCanvas'}
            />
            {isVisible ? children :<span>HI</span>}
        </NPCCanvasContext.Provider>
    );
};

export default connect(mapStateToProps, mapDispatch)(NPCLoop);
