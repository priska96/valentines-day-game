export const HEROES_SPRITE_NAKED  = 'assets/heroes/jihoon_naked.png';
export const HEROES_SPRITE  = 'assets/heroes/jihoon.png';

export const HERO_IMAGE_SIZE = 32;

interface AssetsSingleSize {
    [key: string]: number;
}
export const NPC_IMAGE_SIZE: AssetsSingleSize = {"npc-0":48, "npc-1": 32, "npc-2":32, "npc-3":32};

interface AssetsSingle {
    [key: string]: string;
}
interface Assets {
    [key: string]: string[];
}
export const NPC_SPRITE: AssetsSingle  = {
    "npc-0": 'assets/heroes/blue-dragon.png',
    "npc-1": 'assets/heroes/evil-king.png',
    "npc-2": 'assets/heroes/priska.png',
    "npc-3": 'assets/heroes/blue-dragon.png',
};
export const EVIL_KING_DEAD = 'assets/heroes/evil-king_dead.png'
export const OBJECT_NPC_SPRITE: Assets  = {
    "object-0": ['assets/map/PineTools.com_files/row-6-column-1.png','assets/map/PineTools.com_files/row-6-column-3.png'],
    "object-1": ['assets/map/PineTools.com_files/row-6-column-1.png','assets/map/PineTools.com_files/row-6-column-3.png'],
    "object-2": ['assets/map/PineTools.com_files/row-11-column-7.png','assets/map/PineTools.com_files/row-11-column-6.png'],
    "object-3": ['assets/map/PineTools.com_files/row-12-column-6.png','assets/map/PineTools.com_files/row-11-column-6.png'],
    "object-4": ['assets/map/PineTools.com_files/row-6-column-1.png','assets/map/PineTools.com_files/row-6-column-3.png'],
    "object-5": ['assets/map/evil/row-15-column-4.png','assets/map/evil/row-15-column-5.png'],
    "object-6": ['assets/map/evil/row-16-column-4.png','assets/map/evil/row-16-column-5.png'],
};
