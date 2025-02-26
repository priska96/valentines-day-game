import { magic, wait } from '../shared/helpers';
import { BattleActionHandlerProps } from './BattleActionHandlerProps';

export const handleMagic = ({
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
    const damage = magic({ attacker, receiver });

    (async () => {
        setInSequence(true);
        setAnnouncerMessage(`${attacker.name} has cast a spell!`);
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
        setAnnouncerMessage(`${receiver.name} doesn't know what hit him!`);
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
    })().catch((e) => console.error('handlMagic', e));
};
