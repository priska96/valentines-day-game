import { attack, wait } from '../shared/helpers';
import { BattleActionHandlerProps } from './BattleActionHandlerProps';

export const handleAttack = ({
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
    const damage = attack({ attacker, receiver });

    void (async () => {
        setInSequence(true);
        setAnnouncerMessage(`${attacker.name} has chosen to attack!`);
        await wait(3000);

        if (turn === 0) {
            setPlayerAnimation('attack');
        } else {
            setOpponentAnimation('attack');
        }
        await wait(100);

        if (turn === 0) {
            setPlayerAnimation('static');
        } else {
            setOpponentAnimation('static');
        }
        await wait(500);

        if (turn === 0) {
            setOpponentAnimation('damage');
        } else {
            setPlayerAnimation('damage');
        }
        await wait(1500);

        if (turn === 0) {
            setOpponentAnimation('static');
        } else {
            setPlayerAnimation('static');
        }
        setAnnouncerMessage(`${receiver.name} felt that!`);

        if (turn === 0) {
            setOpponentHealth((h) => (h - damage > 0 ? h - damage : 0));
        } else {
            setPlayerHealth((h) => (h - damage > 0 ? h - damage : 0));
        } // We don't want a negative HP.
        await wait(3500);

        setAnnouncerMessage(`Now it's ${receiver.name}'s turn!`);
        await wait(3500);

        setTurn(turn === 0 ? 1 : 0);
        setInSequence(false);
    })();
};
