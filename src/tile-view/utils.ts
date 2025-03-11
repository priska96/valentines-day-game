import { Autotile, CharacterState, NPC, ObjectNPC } from '@/store/types';
import { MAP_DIMENSIONS } from './maps/mapData';
import { LAYERS, LayersInterface, SOLID_TILES } from './maps/mapImgs';

export const isSolidTile = (x: number, y: number, map: string) => {
    const currentMapLayers = LAYERS[map as keyof LayersInterface];
    let isSolidTile = false;
    for (let i = 0; i <= currentMapLayers.length - 1; i++) {
        const layer = currentMapLayers[i];
        const tile = layer[y][x];
        if (SOLID_TILES.includes(tile)) {
            isSolidTile = true;
        } else if (i > 0 - 1 && tile === '0') {
            continue;
        } else {
            isSolidTile = false;
        }
    }
    return isSolidTile;
};

export const isMapEdge = (x: number, y: number): boolean => {
    const { ROWS, COLS } = MAP_DIMENSIONS;
    // console.log('isMapEdge', (x < 0 || x >= COLS || y < 0 || y >= ROWS)  )
    return x < 0 || x >= COLS || y < 0 || y >= ROWS;
};

export const othersIsOnMap = (
    x: number,
    y: number,
    others: (CharacterState | NPC | ObjectNPC | Autotile)[],
    map: string
): boolean => {
    let result = false;
    others.forEach((otherElem) => {
        if (otherElem.x === x && otherElem.y === y) {
            result = true;
            if (
                otherElem.type !== 'hero' &&
                (otherElem as NPC | ObjectNPC | Autotile).map.includes(map)
            ) {
                result = true;
                if (otherElem.type === 'npc' && (otherElem as NPC).followHero) {
                    result = false;
                }
            }
            if (
                otherElem.type !== 'hero' &&
                !(otherElem as NPC | ObjectNPC | Autotile).map.includes(map)
            ) {
                result = false;
            }
        }
    });
    return result;
};

export const whoIsOnMap = (
    x: number,
    y: number,
    dir: number,
    others: (CharacterState | NPC | ObjectNPC | Autotile)[],
    map: string
): (NPC | ObjectNPC | Autotile) | undefined => {
    let result = undefined;
    others
        .filter((otherElem) => {
            if (otherElem.type === 'character') {
                return false;
            }
            if ((otherElem as ObjectNPC | NPC | Autotile).map.includes(map)) {
                return true;
            }
            return false;
        })
        .forEach((otherElem) => {
            if (
                (otherElem as ObjectNPC).type === 'objectNPC' ||
                (otherElem as NPC).type === 'npc' ||
                (otherElem as Autotile).type === 'autotile'
            ) {
                if (otherElem.x === x && otherElem.y === y - 1 && dir === 3) {
                    result = otherElem as NPC | ObjectNPC | Autotile;
                } else if (
                    otherElem.x === x - 1 &&
                    otherElem.y === y &&
                    dir === 1
                ) {
                    result = otherElem as NPC | ObjectNPC | Autotile;
                } else if (
                    otherElem.x === x &&
                    otherElem.y === y + 1 &&
                    dir === 0
                ) {
                    result = otherElem as NPC | ObjectNPC | Autotile;
                } else if (
                    otherElem.x === x + 1 &&
                    otherElem.y === y &&
                    dir === 2
                ) {
                    result = otherElem as NPC | ObjectNPC | Autotile;
                }
            }
        });
    return result;
};

export const checkMapCollision = (
    x: number,
    y: number,
    others: (CharacterState | NPC | ObjectNPC | Autotile)[],
    map: string
) => {
    return (
        isMapEdge(x, y) ||
        isSolidTile(x, y, map) ||
        othersIsOnMap(x, y, others, map)
    );
};

export const fullyGeared = (inventory: ObjectNPC[]) => {
    let result = 0;
    inventory.forEach((obj) => {
        if (
            obj.item === 'Armor' ||
            obj.item === 'Boots' ||
            obj.item === 'Sword'
        ) {
            result += 1;
        }
    });
    return result;
};

export const getRandom = (movesList: string[]) => {
    return movesList[Math.floor(Math.random() * movesList.length)];
};

export const movesList = ['s', 'a', 'd', 'w'];
