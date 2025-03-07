import { useEffect, useState } from 'react';
import { Sequence } from '../Battle';
import { CharSummary } from '../../tile-view/character/slices/characterSlice';
import { NPCSummary } from '../../tile-view/npc/slices/npcSlice';
import { handleAttack } from '../utils/handleAttack';
import { handleMagic } from '../utils/handleMagic';
import { handleHeal } from '../utils/handleHeal';

export const useBattleSequence = (
    sequence: Sequence,
    playerSummary: CharSummary,
    npcSummary: NPCSummary
) => {
    const [turn, setTurn] = useState(0);
    const [inSequence, setInSequence] = useState(false);

    const [playerHealth, setPlayerHealth] = useState(playerSummary.health);
    const [opponentHealth, setOpponentHealth] = useState(
        npcSummary.health ?? 0
    );

    const [announcerMessage, setAnnouncerMessage] = useState('');

    const [playerAnimation, setPlayerAnimation] = useState('static');
    const [opponentAnimation, setOpponentAnimation] = useState('static');

    useEffect(() => {
        const { mode, turn } = sequence;

        if (mode) {
            const attacker = turn === 0 ? playerSummary : npcSummary;
            const receiver = turn === 0 ? npcSummary : playerSummary;

            switch (mode) {
                case 'attack': {
                    handleAttack({
                        attacker,
                        receiver,
                        setInSequence,
                        setAnnouncerMessage,
                        setPlayerAnimation,
                        setOpponentAnimation,
                        setOpponentHealth,
                        setPlayerHealth,
                        setTurn,
                        turn,
                    });

                    break;
                }

                case 'magic': {
                    handleMagic({
                        attacker,
                        receiver,
                        setInSequence,
                        setAnnouncerMessage,
                        setPlayerAnimation,
                        setOpponentAnimation,
                        setOpponentHealth,
                        setPlayerHealth,
                        setTurn,
                        turn,
                    });

                    break;
                }

                case 'heal': {
                    handleHeal({
                        attacker,
                        receiver,
                        setInSequence,
                        setAnnouncerMessage,
                        setPlayerAnimation,
                        setOpponentAnimation,
                        setOpponentHealth,
                        setPlayerHealth,
                        setTurn,
                        turn,
                    });

                    break;
                }

                default:
                    break;
            }
        }
        return () => {};
    }, [sequence]);

    return {
        turn,
        inSequence,
        playerHealth,
        opponentHealth,
        playerAnimation,
        opponentAnimation,
        announcerMessage,
    };
};
