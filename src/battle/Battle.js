import React, {useEffect, useState} from 'react';
import {connect} from "react-redux";
import { wait } from './shared/helpers';
import styles from './stylesBattle.module.css';
import {PlayerSummary} from "./PlayerSummary";
import {useAIOpponent, useBattleSequence} from "./hooks";
import {BattleMenu} from "./BattleMenu";
import {BattleAnnouncer} from "./BattleAnnouncer";
import {onGameEnd} from "../tile-view/slices/statusSlice";
import {updatePlayerSummary} from "../tile-view/character/slices/characterSlice";
import {setContents} from '../game-ui/slices/dialogSlice'
import {dialogs} from "../tile-view/dialog_utils";
import BattleMusic from "../images/battle.mp3"
import BattleMusic2 from "../images/battle2.mp3"

const Battle = ({character, npcs, selectedOpponentIdx, onGameEnd, setContents, updatePlayerSummary}) => {
    //debugger
    const [sequence, setSequence] = useState({});
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
        if (aiChoice && turn === 1 && !inSequence) {
            setSequence({ turn, mode: aiChoice });
        }
        return()=>{setSequence({})}
    }, [turn, aiChoice, inSequence]);

    useEffect(() => {
        if (playerHealth === 0 || opponentHealth === 0) {
            (async () => {
                await wait(1000);
                onGameEnd(playerHealth === 0 ? {mode:'world' , winner: npcSummary.name} : {mode:'world' , winner: playerSummary.name});
            })();
            if(opponentHealth === 0){
                if(npcSummary.name === 'Blue Dragon') {
                    updatePlayerSummary({
                        level: 3,
                        health: playerHealth,
                        maxHealth: 250,
                        attack: 70,
                        magic: 55,
                        defense: 45,
                        magicDefense: 35
                    })
                    setTimeout(()=> {
                        setContents(dialogs.forest["npc-0"].afterFight.won.content)
                        },500
                    )
                }
                if(npcSummary.name === 'Evil King') {
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
                        setContents(dialogs.evilKing["npc-1"].afterFight.won.content)
                        },500
                    )
                }
            }
            if(playerHealth === 0){
                if(npcSummary.name === 'Blue Dragon'){
                    setContents(dialogs.forest["npc-0"].afterFight.lost.content)
                }
                else if (npcSummary.name === 'Evil King'){
                    setContents(dialogs.evilKing["npc-1"].afterFight.lost.content)
                }

                updatePlayerSummary({health: playerHealth})
            }
        }
        return()=>{setSequence({})}
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

const mapStateToProps = (state) => ({character:{...state.character}, npcs:[...state.npc.npcs], selectedOpponentIdx: state.gameStatus.selectedOpponentIdx})
const mapDispatch =  {onGameEnd, setContents, updatePlayerSummary}
export default connect(mapStateToProps, mapDispatch)(Battle);
