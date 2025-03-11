import BlueDragonFight from '../../images/heroes/blue-dragon_fight.png';
import EvilKingFight from '../../images/heroes/evil-king_fight.png';

export const blueDragon = {
    id: 'npc-0',
    x: 8,
    y: 10,
    step: 0,
    dir: 1,
    followHero: false,
    heroClass: 'DRAGON',
    heroImg: null,
    stopMoving: false,
    type: 'npc',
    map: ['forest', 'sky'],
    dead: false,
    animate: '',
    npcSummary: {
        main: false,
        name: 'Blue Dragon',
        img: BlueDragonFight,
        level: 2,
        health: 150,
        maxHealth: 150,

        magic: 42,
        attack: 70,
        defense: 30,
        magicDefense: 30,
    },
};
export const evilKing = {
    id: 'npc-1',
    x: 8,
    y: 3,
    step: 0,
    dir: 0,
    followHero: false,
    heroClass: 'PUREEVIL',
    heroImg: null,
    stopMoving: true,
    type: 'npc',
    map: ['evilKing'],
    dead: false,
    animate: '',
    npcSummary: {
        main: false,
        name: 'Evil King',
        img: EvilKingFight,
        level: 10,
        health: 1,
        maxHealth: 355,
        magic: 70,
        attack: 65,
        defense: 40,
        magicDefense: 40,
    },
};
