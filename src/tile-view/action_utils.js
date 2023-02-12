import {dialogs} from "./dialog_utils";

export const enterDungeon = (openerId, otherThingIdx, action, setContents, setIsUpdateRequired, changeMap, updatePlayerPosition, updateNPC, updateObject) =>{
    if(action === 'enter-dungeon'){
        setContents({open: false, title: '', text: '', openerId: '', action: ''});
        setIsUpdateRequired(true)
        changeMap('evilKing');
        updateObject({idx:[5,6],'data-5':{ x:4 ,y: 9},'data-6':{ x:4 ,y: 10}})
        setIsUpdateRequired(true)
        updatePlayerPosition({x:7, y: 8, step: 0, dir: 3})
        updateNPC({idx:[2,1],'data-1':{ x:8 ,y: 3, stopMoving:true},'data-2':{ x:3 ,y: 13}})
        setIsUpdateRequired(true)
        setTimeout(()=> {
                setContents(dialogs.evilKing["npc-1"].beforeFight.content)
            },200
        )
        return true;
    }
    return false;
}

export const leaveDungeon = (openerId, otherThingIdx, action, setContents, setIsUpdateRequired, changeMap, updatePlayerPosition, updateNPC) =>{
    if(action === 'leave-dungeon'){
        setContents({open: false, title: '', text: '', openerId: '', action: ''});
        setIsUpdateRequired(true)
        changeMap('sky');
        updateNPC({idx:[2],'data-2':{ x:6 ,y: 7, step: 0, dir: 0, map:['sky', 'evilKing']}});
        setIsUpdateRequired(true);
        updatePlayerPosition({x:5, y: 7, step: 0, dir: 0});
        setIsUpdateRequired(true)
        setTimeout(()=> {
                setContents(dialogs.sky["npc-0"].leftDungeon.content)
            },1000
        )
        return true;
    }
    return false;
}

export const goToSky = (action, setContents, setIsUpdateRequired, changeMap, updatePlayerPosition, updateNPC) => {
    if(action === 'go-to-sky'){
        setContents({open: false, title: '', text: '', openerId: '', action: ''});
        setIsUpdateRequired(true)
        changeMap('sky');
        setIsUpdateRequired(true)
        updatePlayerPosition({x:7, y: 12, step: 0, dir: 3})
        updateNPC({idx:[0],'data-0':{ x:8 ,y: 12, step: 0, dir: 3, stopMoving:true}})
        setIsUpdateRequired(true)
        return true
    }
    return false;
}

export const battleEvilKind = (action, otherThingIdx, setContents, onGameEnd) => {
    if(action === 'battle-evil-king'){
        setContents({open: false, title: '', text: '', openerId: '', action: ''});
        console.log(otherThingIdx)
        onGameEnd({mode: 'battle', winner: undefined, selectedOpponentIdx: otherThingIdx})
        return true;
    }
    return false;
}

export const gameOver = (action, otherThingIdx, setContents, onGameEnd) => {
    if(action === 'game-over'){
        setContents({open: false, title: '', text: '', openerId: '', action: ''});
        console.log(otherThingIdx)
        onGameEnd({mode: 'game-over', winner: 'Evil King', selectedOpponentIdx: otherThingIdx})
        return true;
    }
    return false;
}
export const gameWon = (action, otherThingIdx, setContents, onGameEnd) => {
    if(action === 'game-won'){
        setContents({open: false, title: '', text: '', openerId: '', action: ''});
        console.log(otherThingIdx)
        onGameEnd({mode: 'game-won', winner: 'Jihoon', selectedOpponentIdx: otherThingIdx})
        return true;
    }
    return false;
}
export const victory = (action, otherThingIdx, setContents, setIsUpdateRequired, fireActionObject, updateNPC) => {
    if(action === 'victory'){
        setContents({open: false, title: '', text: '', openerId: '', action: ''});
        fireActionObject({idx: 5})
        fireActionObject({idx: 6})
        setIsUpdateRequired(true)
        updateNPC({idx:[2,1 ],'data-2':{ x:4 ,y: 8}, 'data-1':{dead:true, stopMoving: true}})
        setIsUpdateRequired(true)
        return true;
    }
    return false;
}

