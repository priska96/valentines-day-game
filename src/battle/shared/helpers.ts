import { CharSummary } from '../../tile-view/character/slices/characterSlice';
import { NPCSummary } from '../../tile-view/npc/slices/npcSlice';

export const wait = (ms: number): Promise<void> =>
    new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, ms);
    });

interface AttackParams {
    attacker: CharSummary | NPCSummary;
    receiver: CharSummary | NPCSummary;
}

export const attack = ({ attacker, receiver }: AttackParams): number => {
    const receivedDamage =
        (attacker.attack ?? 1) -
        ((attacker.level ?? 1) - (receiver.level ?? 1)) * 1.25;

    const finalDamage = receivedDamage - (receiver.defense ?? 1) / 2;

    return finalDamage;
};

export const magic = ({ attacker, receiver }: AttackParams): number => {
    const receivedDamage =
        (attacker.magic ?? 1) -
        ((attacker.level ?? 1) - (receiver.level ?? 1)) * 1.25;

    const finalDamage = receivedDamage - (receiver.magicDefense ?? 1) / 2;

    return finalDamage;
};

interface HealParams {
    receiver: CharSummary | NPCSummary;
}

export const heal = ({ receiver }: HealParams): number => {
    return (receiver.magic ?? 1) + (receiver.level ?? 1) * 0.25;
};
