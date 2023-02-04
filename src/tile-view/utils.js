import {LAYERS, MAP_DIMENSIONS, SOLID_TILES} from './constants';

export const isSolidTile = (x, y) => {
    for (let layer of LAYERS) {
        if (SOLID_TILES.includes(layer[y][x])) {
            // console.log('isSolidTile', true)
            return true;
        }
    }
    return false;
};

export const isMapEdge = (x, y) => {
    const {ROWS, COLS} = MAP_DIMENSIONS;
    // console.log('isMapEdge', (x < 0 || x >= COLS || y < 0 || y >= ROWS)  )
    return (x < 0 || x >= COLS || y < 0 || y >= ROWS)        
};

export const othersIsOnMap = (x,y,others) => {
    let result = false;
    others.forEach((otherElem)=>{
        if(otherElem.x === x && otherElem.y ===y){
            result= true
        }
    })
    //console.log('othersIsOnMap', result)
    return result
};

export const whoIsOnMap = (x,y,others) => {
    let result = undefined;
    //debugger
    others.forEach((otherElem)=>{
        if((otherElem.type === 'objectNPC')|| otherElem.type === 'npc') {
            if (otherElem.x === x && otherElem.y === y - 1) {
                result = otherElem
            } else if (otherElem.x === x - 1 && otherElem.y === y) {
                result = otherElem
            } else if (otherElem.x === x && otherElem.y === y + 1) {
                result = otherElem
            } else if (otherElem.x === x + 1 && otherElem.y === y) {
                result = otherElem
            }
        }
    })
    return result
};

export const checkMapCollision = (x, y, others) => {
    return isMapEdge(x,y) || isSolidTile(x,y) ||othersIsOnMap(x,y,others);
};

export const fullyGeared = (inventory) =>{
    let result = 0
    inventory.forEach(item =>{
        if(item.item === 'Armor'||item.item === 'Boots'||item.item === 'Sword'){
            result +=1
        }
    })
    return result
}
