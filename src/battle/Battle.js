import React, {useEffect, useState} from 'react';
import {connect} from "react-redux";
import { wait } from './shared/helpers';
import styles from './stylesBattle.module.css';
import {PlayerSummary} from "./PlayerSummary";
import {useAIOpponent, useBattleSequence} from "./hooks";
import {opponentStats, playerStats} from "./shared/characters";
import {BattleMenu} from "./BattleMenu";
import {BattleAnnouncer} from "./BattleAnnouncer";
import {onGameEnd} from "../tile-view/slices/statusSlice";
import {updatePlayerSummary} from "../tile-view/slices/characterSlice";
import {setContents} from '../game-ui/slices/dialogSlice'

const Battle = ({character, npc, onGameEnd, setContents, updatePlayerSummary}) => {
    debugger
    const [sequence, setSequence] = useState({});
    const {playerSummary} = character;
    const { npcSummary} = npc;


    const {
        turn,
        inSequence,
        playerHealth,
        opponentHealth,
        playerAnimation,
        opponentAnimation,
        announcerMessage,
    } = useBattleSequence(sequence);

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
                onGameEnd(playerHealth === 0 ? {mode:'world' , winner: opponentStats} : {mode:'world' , winner: playerStats});
            })();
            if(opponentHealth === 0){
                setContents(
                {open: true, title: 'Blue Dragon', text: 'You are a true swordsman! I believe you are ready to fight the evil King and resuce the princess!', openerId: ''}
                )
                updatePlayerSummary({level: 3, health: playerHealth, maxHealth: 250})
            }
        }
        return()=>{setSequence({})}
    }, [playerHealth, opponentHealth, onGameEnd]);

    return (
        <div className={styles.mainContainer}>

            <div className={styles.opponent}>
                <div className={styles.summary}>
                    <PlayerSummary
                        main={false}
                        health={opponentHealth}
                        name={opponentStats.name}
                        level={opponentStats.level}
                        maxHealth={opponentStats.maxHealth}
                    />
                </div>
            </div>

            <div className={styles.characters}>
                <div className={styles.gameHeader}>
                    {playerSummary.name} vs {opponentStats.name}
                </div>
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
                            alt={opponentStats.name}
                            src={opponentStats.img}
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

const mapStateToProps = (state) => ({character:{...state.character}, npc:{...state.npc}})
const mapDispatch =  {onGameEnd, setContents, updatePlayerSummary}
export default connect(mapStateToProps, mapDispatch)(Battle);
