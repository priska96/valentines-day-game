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
import ancientSeer from './assets/heroes/npc10.png';
import citizen1 from './assets/heroes/npc11.png';
import citizen2 from './assets/heroes/npc12.png';
import citizen3 from './assets/heroes/npc13.png';
import citizen4 from './assets/heroes/npc14.png';
import citizen5 from './assets/heroes/npc15.png';
import citizen6 from './assets/heroes/npc16.png';
import citizen7 from './assets/heroes/npc17.png';
import citizen8 from './assets/heroes/npc18.png';
import citizen9 from './assets/heroes/npc19.png';
import citizen10 from './assets/heroes/npc20.png';
import whiteFish from './assets/heroes/whiteFish.png';
import blueFish from './assets/heroes/blueFish.png';
import greenFish from './assets/heroes/greenFish.png';
import beigeFish from './assets/heroes/beigeFish.png';
import redFish from './assets/heroes/redFish.png';
import merman1 from './assets/heroes/npc26.png';
import mermaid1 from './assets/heroes/npc27.png';
import merman2 from './assets/heroes/npc28.png';
import mermaid2 from './assets/heroes/npc29.png';
import mermaidQueen from './assets/heroes/npc30.png';
import seaMonster1 from './assets/heroes/seaMonster1.png';
import seaMonster2 from './assets/heroes/seaMonster2.png';
import seaMonster1Dead from './assets/heroes/seaMonster1_dead.png';
import seaMonster2Dead from './assets/heroes/seaMonster2_dead.png';
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
import whirlpoolAutotile from './assets/map/well-inner/whirlpoolAutotile.png';

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
    'npc-10': 32,
    'npc-11': 32,
    'npc-12': 32,
    'npc-13': 32,
    'npc-14': 32,
    'npc-15': 32,
    'npc-16': 32,
    'npc-17': 32,
    'npc-18': 32,
    'npc-19': 32,
    'npc-20': 32,
    'npc-21': 32,
    'npc-22': 32,
    'npc-23': 32,
    'npc-24': 32,
    'npc-25': 32,
    'npc-26': 56,
    'npc-27': 56,
    'npc-28': 56,
    'npc-29': 56,
    'npc-30': 48,
    'npc-31': 32,
    'npc-32': 32,
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
    'npc-10': ancientSeer,
    'npc-11': citizen1,
    'npc-12': citizen2,
    'npc-13': citizen3,
    'npc-14': citizen4,
    'npc-15': citizen5,
    'npc-16': citizen6,
    'npc-17': citizen7,
    'npc-18': citizen8,
    'npc-19': citizen9,
    'npc-20': citizen10,
    'npc-21': whiteFish,
    'npc-22': blueFish,
    'npc-23': greenFish,
    'npc-24': beigeFish,
    'npc-25': redFish,
    'npc-26': merman1,
    'npc-27': mermaid1,
    'npc-28': merman2,
    'npc-29': mermaid2,
    'npc-30': mermaidQueen,
    'npc-31': seaMonster1,
    'npc-32': seaMonster2,
};
export const EVIL_KING_DEAD = evilKingDead;

export const NPC_SPRITE_DEAD: AssetsSingle = {
    'npc-0': blueDragon,
    'npc-1': evilKingDead,
    'npc-2': priska,
    'npc-3': evilQueenDead,
    'npc-4': king,
    'npc-31': seaMonster1Dead,
    'npc-32': seaMonster2Dead,
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

export const Autotile_SPRITE: AssetsSingle = {
    'autotile-0': whirlpoolAutotile,
};

export const Autotile_IMAGE_SIZE: AssetsSingleSize = {
    'autotile-0': 48,
};
