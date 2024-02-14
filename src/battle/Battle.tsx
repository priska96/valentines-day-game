import React, {useEffect, useState} from 'react';
import {connect, ConnectedProps} from "react-redux";
import { wait } from './shared/helpers';
import styles from './stylesBattle.module.css';
import {PlayerSummary} from "./PlayerSummary";
import {useAIOpponent, useBattleSequence} from "./hooks";
import {BattleMenu} from "./BattleMenu";
import {BattleAnnouncer} from "./BattleAnnouncer";
import {onGameEnd} from "../tile-view/slices/statusSlice";
import  {updatePlayerSummary} from "../tile-view/character/slices/characterSlice";
import {setContents} from '../game-ui/slices/dialogSlice'
import {dialogs} from "../tile-view/dialog_utils";
import BattleMusic from "../images/battle.mp3"
import BattleMusic2 from "../images/battle2.mp3"
import {RootState} from "../store";

export interface Sequence {turn:number; mode:string}

const Battle = ({character, npcs, selectedOpponentIdx, onGameEnd, setContents, updatePlayerSummary}:PropsFromRedux) => {
    //debugger
    const [sequence, setSequence] = useState<Sequence>({turn: -1, mode:""});
    const {playerSummary} = character;
    const { npcSummary} = npcs[selectedOpponentIdx];


    const {
        turn,
        inSequence,
        playerHealth,
        opponentHealth,
        playerAnimation,
        opponentAnimation,
        announcerMessage,
    } = useBattleSequence(sequence, playerSummary, npcSummary);

    const aiChoice = useAIOpponent(turn);

    useEffect(() => {
        if (aiChoice && turn === 1 && !inSequence && !sequence.mode) {
            setSequence({ turn, mode: aiChoice });
        }
        return()=>{setSequence({turn: -1, mode:""})}
    }, [turn, aiChoice, inSequence]);

    useEffect(() => {
        if (playerHealth === 0 || opponentHealth === 0) {
            (async () => {
                await wait(1000);
                onGameEnd(playerHealth === 0
                    ? {mode:'world' , winner: npcSummary.name, selectedOpponentIdx: 0}
                    : {mode:'world' , winner: playerSummary.name,selectedOpponentIdx: 0});
            })();
            if(opponentHealth === 0){
                switch(npcSummary.name ){
                    case 'Blue Dragon': {
                        updatePlayerSummary({
                            level: 3,
                            health: playerHealth,
                            maxHealth: 250,
                            attack: 85,
                            magic: 55,
                            defense: 45,
                            magicDefense: 35
                        })
                        setTimeout(() => {
                                setContents(dialogs.forest["npc-0"].afterFight.won!.content)
                            }, 500
                        )
                        break;
                    }
                    case 'Evil King':{
                        updatePlayerSummary({
                            level: 12,
                            health: playerHealth,
                            maxHealth: 450,
                            attack: 100,
                            magic: 75,
                            defense: 55,
                            magicDefense: 55
                        })
                        setTimeout(()=> {
                                setContents(dialogs.evilKing["npc-1"].afterFight.won!.content)
                            },500
                        )
                        break;
                    }
                    case 'Evil Queen':{

                        updatePlayerSummary({
                            level: 17,
                            health: playerHealth,
                            maxHealth: 650,
                            attack: 130,
                            magic: 85,
                            defense: 70,
                            magicDefense: 65
                        })
                        setTimeout(()=> {
                                setContents(dialogs.piscesTown["npc-3"].afterFight.won!.content)
                            },500
                        )
                        break;
                    }
                    default:{
                        updatePlayerSummary({
                            level: playerSummary.level+0.5,
                            health: playerHealth,
                            maxHealth: playerSummary.maxHealth+30,
                            attack: playerSummary.attack +10,
                            magic: playerSummary.magic +5,
                            defense: playerSummary.defense +15,
                            magicDefense: playerSummary.magicDefense +5
                        })
                    }
                }
            }
            if(playerHealth === 0){

                switch(npcSummary.name ){
                    case 'Blue Dragon':{
                        setContents(dialogs.forest["npc-0"].afterFight.lost!.content)
                        break;
                    }
                    case 'Evil King':{
                        setContents(dialogs.evilKing["npc-1"].afterFight.lost!.content)
                        break;
                    }
                    case 'Evil Queen':{
                        setContents(dialogs.piscesTown["npc-3"].afterFight.lost!.content)
                        break;
                    }
                    default:{
                        onGameEnd({mode:'world' , winner: npcSummary.name, selectedOpponentIdx: 0})
                    }
                }
                updatePlayerSummary({health: playerHealth})
            }
        }
        return()=>{setSequence({turn: -1, mode:""})}
    }, [playerHealth, opponentHealth, onGameEnd]);

    return (
        <div className={styles.mainContainer}>
            {npcSummary.name === "Blue Dragon"?
                <audio id="audio" loop autoPlay>
                    <source src={BattleMusic2} type="audio/mp3"/>
                </audio>:
                <audio id="audio" loop autoPlay>
                    <source src={BattleMusic} type="audio/mp3"/>
                </audio>
            }

            <div className={styles.gameHeader}>
                {playerSummary.name} vs {npcSummary.name}
            </div>
            <div className={styles.opponent}>
                <div className={styles.summary}>
                    <PlayerSummary
                        main={false}
                        health={opponentHealth}
                        name={npcSummary.name}
                        level={npcSummary.level}
                        maxHealth={npcSummary.maxHealth}
                    />
                </div>
            </div>

            <div className={styles.characters}>

                <div className={styles.gameImages}>
                    <div className={styles.playerSprite}>
                        <img
                            alt={playerSummary.name}
                            src={playerSummary.img}
                            className={styles[playerAnimation]}
                        />
                    </div>
                    <div className={styles.opponentSprite}>
                        <img
                            alt={npcSummary.name}
                            src={npcSummary.img}
                            className={styles[opponentAnimation]}
                        />
                    </div>
                </div>
            </div>

            <div className={styles.user}>
                <div className={styles.summary}>
                    <PlayerSummary
                        main={true}
                        health={playerHealth}
                        name={playerSummary.name}
                        level={playerSummary.level}
                        maxHealth={playerSummary.maxHealth}
                    />
                </div>

                <div className={styles.hud}>
                    <div className={styles.hudChild}>
                        <BattleAnnouncer
                            message={
                                announcerMessage || `What will ${playerSummary.name} do?`
                            }
                        />
                    </div>
                    {!inSequence && turn === 0 && (
                        <div className={styles.hudChild}>
                            <BattleMenu
                                onHeal={() => setSequence({ mode: 'heal', turn })}
                                onMagic={() => setSequence({ mode: 'magic', turn })}
                                onAttack={() => setSequence({ mode: 'attack', turn })}
                            />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

const mapStateToProps = (state: RootState) => ({character:{...state.character}, npcs:[...state.npc.npcs], selectedOpponentIdx: state.gameStatus.selectedOpponentIdx})
const mapDispatch =  {onGameEnd, setContents, updatePlayerSummary}
const connector = connect(mapStateToProps, mapDispatch)

type PropsFromRedux = ConnectedProps<typeof connector>

export default connector(Battle);
