import React, { useEffect, useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { wait } from './shared/helpers';
import styles from './stylesBattle.module.css';
import { PlayerSummary } from './PlayerSummary';
import { useAIOpponent, useBattleSequence } from './hooks';
import { BattleMenu } from './BattleMenu';
import { BattleAnnouncer } from './BattleAnnouncer';
import { GameModeEnum, onGameEnd } from '../tile-view/slices/statusSlice';
import { updatePlayerSummary } from '../tile-view/character/slices/characterSlice';
import { setContents } from '../game-ui/slices/dialogSlice';
import BattleMusic from '../images/battle.mp3';
import BattleMusic2 from '../images/battle2.mp3';
import { RootState } from '../store';
import { handleOpponentHealthZero } from './utils/handleOpponentHealthZero';
import { handlePlayerHealthZero } from './utils/handlePlayerHealthZero';

export interface Sequence {
    turn: number;
    mode: string;
}

const Battle = ({
    character,
    npcs,
    selectedOpponentIdx,
    onGameEnd,
    setContents,
    updatePlayerSummary,
}: PropsFromRedux) => {
    const [sequence, setSequence] = useState<Sequence>({ turn: -1, mode: '' });
    const { playerSummary } = character;
    const { npcSummary } = npcs[selectedOpponentIdx];

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
    }, [turn, aiChoice, inSequence]);

    useEffect(() => {
        if (playerHealth === 0 || opponentHealth === 0) {
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
                        });
                    }
                    if (playerHealth === 0) {
                        handlePlayerHealthZero({
                            npcSummary,
                            updatePlayerSummary,
                            playerHealth,
                            setContents,
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
    }, [playerHealth, opponentHealth, onGameEnd]);

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

const mapStateToProps = (state: RootState) => ({
    character: { ...state.character },
    npcs: [...state.npc.npcs],
    selectedOpponentIdx: state.gameStatus.selectedOpponentIdx,
});
const mapDispatch = { onGameEnd, setContents, updatePlayerSummary };
const connector = connect(mapStateToProps, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(Battle);
