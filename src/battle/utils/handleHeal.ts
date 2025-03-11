import { heal, wait } from '../shared/helpers';
import { BattleActionHandlerProps } from './BattleActionHandlerProps';

export const handleHeal = ({
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
}: BattleActionHandlerProps) => {
    const recovered = heal({ receiver: attacker });

    (async () => {
        setInSequence(true);
        setAnnouncerMessage(`${attacker.name} has chosen to heal!`);
        await wait(3000);

        if (turn === 0) {
            setPlayerAnimation('magic');
        } else {
            setOpponentAnimation('magic');
        }
        await wait(1000);

        if (turn === 0) {
            setPlayerAnimation('static');
        } else {
            setOpponentAnimation('static');
        }
        await wait(500);

        setAnnouncerMessage(`${attacker.name} has recovered health.`);
        if (turn === 0) {
            setPlayerHealth((h) =>
                h + recovered <= (attacker.maxHealth ?? 1)
                    ? h + recovered
                    : (attacker.maxHealth ?? 1)
            );
        } else {
            setOpponentHealth((h) =>
                h + recovered <= (attacker.maxHealth ?? 1)
                    ? h + recovered
                    : (attacker.maxHealth ?? 1)
            );
        } // We don't want to set HP more than the max
        await wait(3500);

        setAnnouncerMessage(`Now it's ${receiver.name}'s turn!`);
        await wait(3500);

        setTurn(turn === 0 ? 1 : 0);
        setInSequence(false);
    })().catch((e) => console.error('handleHeal', e));
};
