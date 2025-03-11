import { CharacterState, CharSummary, NPCSummary } from '@/store/types';

export const playerStats: CharSummary & Pick<CharacterState, 'portrait'> = {
    level: 0,
    health: 177,
    maxHealth: 177,
    name: 'Jihoon',
    img: '/assets/heroes/jihoon_fight.png',
    magic: 32,
    attack: 50,
    defense: 30,
    magicDefense: 30,
    portrait: '/assets/heroes/jihoon_portrait.png',
};

export const opponentStats: NPCSummary = {
    level: 2,
    name: 'Blue Dragon',
    health: 80,
    maxHealth: 80,
    img: '/assets/heroes/evil-king_fight.png',
    magic: 50,
    attack: 32,
    defense: 20,
    magicDefense: 48,
};
