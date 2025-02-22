import {
    LAYERS,
    LayersInterface,
    MAP_DIMENSIONS,
    SOLID_TILES,
} from './mapImgs';
import { NPC } from './npc/slices/npcSlice';
import { ObjectNPC } from './objectNPC/slices/objectSlice';
import { CharacterState } from './character/slices/characterSlice';

export const isSolidTile = (x: number, y: number, map: string) => {
    const currentMapLayers = LAYERS[map as keyof LayersInterface];
    for (const layer of currentMapLayers) {
        if (SOLID_TILES.includes(layer[y][x])) {
            // console.log('isSolidTile', true)
            return true;
        }
    }
    return false;
};

export const isMapEdge = (x: number, y: number): boolean => {
    const { ROWS, COLS } = MAP_DIMENSIONS;
    // console.log('isMapEdge', (x < 0 || x >= COLS || y < 0 || y >= ROWS)  )
    return x < 0 || x >= COLS || y < 0 || y >= ROWS;
};

export const othersIsOnMap = (
    x: number,
    y: number,
    others: (CharacterState | NPC | ObjectNPC)[],
    map: string
): boolean => {
    let result = false;
    others.forEach((otherElem) => {
        if (otherElem.x === x && otherElem.y === y) {
            result = true;
            if (
                otherElem.type !== 'hero' &&
                (otherElem as NPC | ObjectNPC).map.includes(map)
            ) {
                result = true;
            }
            if (
                otherElem.type !== 'hero' &&
                !(otherElem as NPC | ObjectNPC).map.includes(map)
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
    others: (CharacterState | NPC | ObjectNPC)[]
): (NPC | ObjectNPC) | undefined => {
    let result = undefined;
    //debugger
    others.forEach((otherElem) => {
        if (
            (otherElem as ObjectNPC).type === 'objectNPC' ||
            (otherElem as NPC).type === 'npc'
        ) {
            if (otherElem.x === x && otherElem.y === y - 1) {
                result = otherElem as NPC | ObjectNPC;
            } else if (otherElem.x === x - 1 && otherElem.y === y) {
                result = otherElem as NPC | ObjectNPC;
            } else if (otherElem.x === x && otherElem.y === y + 1) {
                result = otherElem as NPC | ObjectNPC;
            } else if (otherElem.x === x + 1 && otherElem.y === y) {
                result = otherElem as NPC | ObjectNPC;
            }
        }
    });

    return result;
};

export const checkMapCollision = (
    x: number,
    y: number,
    others: (CharacterState | NPC | ObjectNPC)[],
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
    inventory.forEach((item) => {
        if (
            item.item === 'Armor' ||
            item.item === 'Boots' ||
            item.item === 'Sword'
        ) {
            result += 1;
        }
    });
    return result;
};

export const getRandom = (movesList: string[]) => {
    return movesList[Math.floor(Math.random() * movesList.length)];
};

export const movesList = ['w', 's', 'a', 'd'];
