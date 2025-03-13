import React, { useEffect, useState } from 'react';
import { wait } from './shared/helpers';
import styles from './stylesBattle.module.css';
import { useAIOpponent, useBattleSequence } from './hooks';
import { PlayerSummary } from './PlayerSummary';
import { BattleMenu } from './BattleMenu';
import { BattleAnnouncer } from './BattleAnnouncer';
import BattleMusic from '../images/battle.mp3';
import BattleMusic2 from '../images/battle2.mp3';
import { handleOpponentHealthZero } from './utils/handleOpponentHealthZero';
import { handlePlayerHealthZero } from './utils/handlePlayerHealthZero';
import { GameModeEnum } from '@/store/enums';
import { useRootStore } from '@/store/useRootStore';

export interface Sequence {
    turn: number;
    mode: string;
}

const Battle = () => {
    const {
        npcs,
        gameStatus,
        onGameEnd,
        setContents,
        updatePlayerSummary,
        character,
    } = useRootStore();
    const [sequence, setSequence] = useState<Sequence>({ turn: -1, mode: '' });
    const { playerSummary } = character;
    const { selectedOpponentIdx } = gameStatus;
    const { npcSummary } = npcs[selectedOpponentIdx];

    console.log('mode', gameStatus.mode, gameStatus.previousMode);
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
        return () => {
            setSequence({ turn: -1, mode: '' });
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [turn, aiChoice, inSequence]);

    useEffect(() => {
        if (playerHealth === 0 || opponentHealth === 0) {
            console.log('fiight over: mode', gameStatus.mode);
            (async () => {
                await wait(1000);
                onGameEnd(
                    playerHealth === 0
                        ? {
                              mode: GameModeEnum.WORLD,
                              winner: npcSummary.name,
                              selectedOpponentIdx: 0,
                          }
                        : {
                              mode: GameModeEnum.WORLD,
                              winner: playerSummary.name,
                              selectedOpponentIdx: 0,
                          }
                );
            })()
                .then(() => {
                    if (opponentHealth === 0) {
                        handleOpponentHealthZero({
                            npcSummary,
                            playerSummary,
                            updatePlayerSummary,
                            setContents,
                            playerHealth,
                            onGameEnd,
                            gameStatus,
                        });
                    }
                    if (playerHealth === 0) {
                        handlePlayerHealthZero({
                            npcSummary,
                            updatePlayerSummary,
                            playerHealth,
                            setContents,
                            onGameEnd,
                        });
                    }
                })
                .catch((err) => {
                    console.error('battle ', err);
                });
        }
        return () => {
            setSequence({ turn: -1, mode: '' });
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [playerHealth, opponentHealth, onGameEnd, gameStatus.mode]);

    return (
        <div className={styles.mainContainer}>
            {npcSummary.name === 'Blue Dragon' ? (
                <audio id="audio" loop autoPlay>
                    <source src={BattleMusic2} type="audio/mp3" />
                </audio>
            ) : (
                <audio id="audio" loop autoPlay>
                    <source src={BattleMusic} type="audio/mp3" />
                </audio>
            )}

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
                                announcerMessage ||
                                `What will ${playerSummary.name} do?`
                            }
                        />
                    </div>
                    {!inSequence && turn === 0 && (
                        <div className={styles.hudChild}>
                            <BattleMenu
                                onHeal={() =>
                                    setSequence({ mode: 'heal', turn })
                                }
                                onMagic={() =>
                                    setSequence({ mode: 'magic', turn })
                                }
                                onAttack={() =>
                                    setSequence({ mode: 'attack', turn })
                                }
                            />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Battle;
