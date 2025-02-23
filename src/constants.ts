import jihoonNaked from './assets/heroes/jihoon_naked.png';
import jihoon from './assets/heroes/jihoon.png';
import blueDragon from './assets/heroes/blue-dragon.png';
import evilKing from './assets/heroes/evil-king.png';
import priska from './assets/heroes/priska.png';
import evilKingDead from './assets/heroes/evil-king_dead.png';
import evilQueen from './assets/heroes/evil-queen.png';
import evilQueenDead from './assets/heroes/evil-queen_dead.png';
import servant1 from './assets/heroes/npc5.png';
import servant2 from './assets/heroes/npc6.png';
import king from './assets/heroes/king.png';
import objectO1 from './assets/map/PineTools.com_files/row-6-column-1.png';
import objectO2 from './assets/map/PineTools.com_files/row-6-column-3.png';
import object11 from './assets/map/PineTools.com_files/row-6-column-1.png';
import object12 from './assets/map/PineTools.com_files/row-6-column-3.png';
import object21 from './assets/map/PineTools.com_files/row-11-column-7.png';
import object22 from './assets/map/PineTools.com_files/row-11-column-6.png';
import object31 from './assets/map/PineTools.com_files/row-12-column-6.png';
import object32 from './assets/map/PineTools.com_files/row-11-column-6.png';
import object41 from './assets/map/PineTools.com_files/row-6-column-1.png';
import object42 from './assets/map/PineTools.com_files/row-6-column-3.png';
import object51 from './assets/map/evil/row-15-column-4.png';
import object52 from './assets/map/evil/row-15-column-5.png';
import object61 from './assets/map/evil/row-16-column-4.png';
import object62 from './assets/map/evil/row-16-column-5.png';

export const HEROES_SPRITE_NAKED = jihoonNaked;
export const HEROES_SPRITE = jihoon;

export const HERO_IMAGE_SIZE = 32;

interface AssetsSingleSize {
    [key: string]: number;
}
export const NPC_IMAGE_SIZE: AssetsSingleSize = {
    'npc-0': 48,
    'npc-1': 32,
    'npc-2': 32,
    'npc-3': 32,
    'npc-4': 32,
    'npc-5': 32,
    'npc-6': 32,
    'npc-7': 32,
    'npc-8': 32,
    'npc-9': 32,
};

interface AssetsSingle {
    [key: string]: string;
}
interface Assets {
    [key: string]: string[];
}
export const NPC_SPRITE: AssetsSingle = {
    'npc-0': blueDragon,
    'npc-1': evilKing,
    'npc-2': priska,
    'npc-3': evilQueen,
    'npc-4': king,
    'npc-5': servant1,
    'npc-6': servant2,
    'npc-7': ' ',
    'npc-8': ' ',
    'npc-9': ' ',
};
export const EVIL_KING_DEAD = evilKingDead;

export const NPC_SPRITE_DEAD: AssetsSingle = {
    'npc-0': blueDragon,
    'npc-1': evilKingDead,
    'npc-2': priska,
    'npc-3': evilQueenDead,
    'npc-4': king,
};
export const OBJECT_NPC_SPRITE: Assets = {
    'object-0': [objectO1, objectO2],
    'object-1': [object11, object12],
    'object-2': [object21, object22],
    'object-3': [object31, object32],
    'object-4': [object41, object42],
    'object-5': [object51, object52],
    'object-6': [object61, object62],
};

export const wildFightOpts = [
    true,
    false,
    false,
    true,
    false,
    true,
    false,
    true,
    false,
    false,
    true,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
];
