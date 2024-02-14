import {
  wait,
  magic,
  heal,
  attack,
} from '../shared/helpers';
import { useEffect, useState } from 'react';
import {dialogs} from "../../tile-view/dialog_utils";
import {Sequence} from "../Battle";
import {CharSummary} from "../../tile-view/character/slices/characterSlice";
import {NPCSummary} from "../../tile-view/npc/slices/npcSlice";

export const useBattleSequence = (sequence:Sequence, playerSummary: CharSummary, npcSummary:NPCSummary) => {
  const [turn, setTurn] = useState(0);
  const [inSequence, setInSequence] = useState(false);

  const [playerHealth, setPlayerHealth] = useState(playerSummary.maxHealth);
  const [opponentHealth, setOpponentHealth] = useState(
      npcSummary.maxHealth ?? 0,
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
          const damage = attack({ attacker, receiver });

          (async () => {
            setInSequence(true);
            setAnnouncerMessage(`${attacker.name} has chosen to attack!`);
            await wait(3000);

            turn === 0
                ? setPlayerAnimation('attack')
                : setOpponentAnimation('attack');
            await wait(100);

            turn === 0
                ? setPlayerAnimation('static')
                : setOpponentAnimation('static');
            await wait(500);

            turn === 0
                ? setOpponentAnimation('damage')
                : setPlayerAnimation('damage');
            await wait(1500);

            turn === 0
                ? setOpponentAnimation('static')
                : setPlayerAnimation('static');
            setAnnouncerMessage(`${receiver.name} felt that!`);

            turn === 0
                ? setOpponentHealth(h => (h - damage > 0 ? h - damage : 0))
                : setPlayerHealth(h => (h - damage > 0 ? h - damage : 0)); // We don't want a negative HP.
            await wait(3500);

            setAnnouncerMessage(`Now it's ${receiver.name}'s turn!`);
            await wait(3500);

            setTurn(turn === 0 ? 1 : 0);
            setInSequence(false);
          })();

          break;
        }

        case 'magic': {
          const damage = magic({ attacker, receiver });

          (async () => {
            setInSequence(true);
            setAnnouncerMessage(`${attacker.name} has cast a spell!`);
            await wait(3000);

            turn === 0
                ? setPlayerAnimation('magic')
                : setOpponentAnimation('magic');
            await wait(1000);

            turn === 0
                ? setPlayerAnimation('static')
                : setOpponentAnimation('static');
            await wait(500);

            turn === 0
                ? setOpponentAnimation('damage')
                : setPlayerAnimation('damage');
            await wait(1500);

            turn === 0
                ? setOpponentAnimation('static')
                : setPlayerAnimation('static');
            setAnnouncerMessage(
                `${receiver.name} doesn't know what hit him!`,
            );
            turn === 0
                ? setOpponentHealth(h => (h - damage > 0 ? h - damage : 0))
                : setPlayerHealth(h => (h - damage > 0 ? h - damage : 0)); // We don't want a negative HP.
            await wait(3500);

            setAnnouncerMessage(`Now it's ${receiver.name}'s turn!`);
            await wait(3500);

            setTurn(turn === 0 ? 1 : 0);
            setInSequence(false);
          })();

          break;
        }

        case 'heal': {
          const recovered = heal({ receiver: attacker });

          (async () => {
            setInSequence(true);
            setAnnouncerMessage(`${attacker.name} has chosen to heal!`);
            await wait(3000);

            turn === 0
              ? setPlayerAnimation('magic')
              : setOpponentAnimation('magic');
            await wait(1000);

            turn === 0
              ? setPlayerAnimation('static')
              : setOpponentAnimation('static');
            await wait(500);

            setAnnouncerMessage(`${attacker.name} has recovered health.`);
            turn === 0
              ? setPlayerHealth(h =>
                  h + recovered <= (attacker.maxHealth ?? 0)
                    ? h + recovered
                    : attacker.maxHealth,
                )
              : setOpponentHealth(h =>
                  h + recovered <= (attacker.maxHealth ?? 0)
                    ? h + recovered
                    : attacker.maxHealth,
                ); // We don't want to set HP more than the max
            await wait(3500);

            setAnnouncerMessage(`Now it's ${receiver.name}'s turn!`);
            await wait(3500);

            setTurn(turn === 0 ? 1 : 0);
            setInSequence(false);
          })();

          break;
        }

        default:
          break;
      }
    }
    return()=>{}
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
