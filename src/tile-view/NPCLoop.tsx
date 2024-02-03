import React, {PropsWithChildren, useCallback, useEffect, useRef, useState} from 'react';
import {connect, ConnectedProps} from 'react-redux';

import NpcCanvasContext from './npcCanvasContext';
import {MAP_DIMENSIONS, TILE_SIZE, MOVE_DIRECTIONS, MoveDirectionsInterface} from './constants';
import {move, } from './npc/slices/npcSlice'
import {checkMapCollision} from './utils';
import {NPC_SPRITE} from "../constants";
import {RootState} from "../store";

//import useWalk from "../hooks/use-walk";


const NPCLoop : React.FC<PropsWithChildren<PropsFromRedux>> = ({
                      children,
                      character,
                      npc,
                      move,
                      objectNPC,map,
                  }:PropsWithChildren<PropsFromRedux>) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [ctx, setCtx] = useState<CanvasRenderingContext2D|null>(null);
    const [isVisible, setIsVisible] = useState(true);
    const [isUpdateRequired, setIsUpdateRequired] = useState(false);
    const movesList = ['w', 's', 'a', 'd']
    const loopRef = useRef<number>();
    const width = MAP_DIMENSIONS.COLS * TILE_SIZE;
    const height = MAP_DIMENSIONS.ROWS * TILE_SIZE;

    const moveNPC = (keyString: string, idx: number) => {
        const currentNPC = npc.npcs[idx]
        if (currentNPC.stopMoving) return
        if (MOVE_DIRECTIONS[keyString as keyof MoveDirectionsInterface]) {
            const [x, y] = MOVE_DIRECTIONS[keyString as keyof  MoveDirectionsInterface];
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

    const getRandom = (movesList: string[] ) => {
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
        if(canvasRef.current) {
            setCtx(canvasRef.current.getContext('2d'));
        }
    }, [canvasRef.current, setCtx]);

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
        <NpcCanvasContext.Provider value={ctx}>
            <canvas style={{zIndex: 2, }}
                    ref={canvasRef}
                    width={width}
                    height={height}
                    id={'npcCanvas'}
            />
            {isVisible ? children :<span>HI</span>}
        </NpcCanvasContext.Provider>
    );
};

const mapStateToProps = ({character, npc, objectNPC, gameStatus}: RootState) => ({character, npc, objectNPC, map:gameStatus.map});
const mapDispatch = {move};
const connector = connect(mapStateToProps, mapDispatch)

type PropsFromRedux = ConnectedProps<typeof connector>


export default connector(NPCLoop);
