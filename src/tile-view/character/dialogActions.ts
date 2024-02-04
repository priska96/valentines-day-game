import {battleEvilKind, enterDungeon, gameOver, gameWon, goToSky, leaveDungeon, victory} from "../action_utils";
import {dialogs} from "../dialog_utils";
import {fullyGeared, whoIsOnMap} from "../utils";
import {ObjectNPC, ObjectState, UpdateObjectAction} from "../objectNPC/slices/objectSlice";
import {AddToInventoryAction, CharacterState, UpdatePlayerPositionAction} from "./slices/characterSlice";
import {FireAction, NPCState, UpdateNPCAction} from "../npc/slices/npcSlice";
import {DialogState} from "../../game-ui/slices/dialogSlice";
import {ActionCreatorWithPayload} from "@reduxjs/toolkit";
import {OnGameEndAction} from "../slices/statusSlice";

export const finishAction = (
    dialog: DialogState,
    npc: NPCState,
    objectNPC: ObjectState,
    setIsUpdateRequired: React.Dispatch<React.SetStateAction<boolean>>,
    setContents: ActionCreatorWithPayload<any, "dialog/setContents">,
    fireAction: ActionCreatorWithPayload<FireAction, "npc/fireAction">,
    onGameEnd: ActionCreatorWithPayload<OnGameEndAction, "gameStatus/onGameEnd">,
    changeMap: ActionCreatorWithPayload<string, "gameStatus/changeMap">,
    updatePlayerPosition:  ActionCreatorWithPayload<UpdatePlayerPositionAction, "character/updatePlayerPosition">,
    updateNPC: ActionCreatorWithPayload<UpdateNPCAction, "npc/updateNPC">,
    updateObject:  ActionCreatorWithPayload<UpdateObjectAction, "objectNPC/updateObject">,
    fireActionObject:  ActionCreatorWithPayload<FireAction, "objectNPC/fireAction">,
    addToInventory:  ActionCreatorWithPayload<AddToInventoryAction, "character/addToInventory">
    ) => {
    console.log("finish action")
    const openerId = dialog.openerId;
    const otherThingIdx = parseInt(openerId.split('-')[1])
    if(enterDungeon(openerId, otherThingIdx, dialog.action,setContents, setIsUpdateRequired, changeMap, updatePlayerPosition, updateNPC, updateObject)){
        return;
    }
    else if(goToSky(dialog.action,setContents, setIsUpdateRequired, changeMap, updatePlayerPosition, updateNPC)){
        return;
    }
    else if(battleEvilKind(dialog.action, otherThingIdx, setContents, onGameEnd)){
        return;
    }
    else if(gameOver(dialog.action, otherThingIdx, setContents, onGameEnd)){
        return;
    }
    else if(victory(dialog.action, otherThingIdx, setContents, setIsUpdateRequired, fireActionObject, updateNPC)){
        return;
    }
    else if(leaveDungeon(openerId, otherThingIdx, dialog.action, setContents, setIsUpdateRequired, changeMap, updatePlayerPosition, updateNPC)){
        return;
    }
    else if(gameWon(dialog.action, otherThingIdx, setContents, onGameEnd)){
        return;
    }

    if (openerId.startsWith('npc-') && npc.npcs[otherThingIdx].stopMoving) {
        setContents({open: false, title: '', text: '', openerId: '', action: ''});
        fireAction({idx: otherThingIdx});
    }
    else if (openerId.startsWith('object-')) {
        setIsUpdateRequired(true);
        const prevTitle = dialog.title

        setContents({open: false, title: '', text: '', openerId: '', action: ''});
        fireActionObject({idx: otherThingIdx});
        if( prevTitle!== 'Nothing!') addToInventory({item: objectNPC.objects[otherThingIdx]})
    }
    else{
        setContents({open: false, title: '', text: '', openerId: '', action: ''});
    }
}

export const doAction = (
    map: string,
    character: CharacterState,
    npc: NPCState, objectNPC: ObjectState,
    winner:string|undefined,
    setContents: ActionCreatorWithPayload<any, "dialog/setContents">,
    fireAction: ActionCreatorWithPayload<FireAction, "npc/fireAction">,
    onGameEnd: ActionCreatorWithPayload<OnGameEndAction, "gameStatus/onGameEnd">
) => {
    console.log("action")
    if(map ==='sky' && character.x === 5 && character.y === 6 ){
        setContents(dialogs.sky["npc-0"].enterDungeon.content)
    }
    const otherThing = whoIsOnMap(character.x, character.y, [...npc.npcs, ...objectNPC.objects])
    console.log(otherThing)
    if (!otherThing) return
    if (otherThing.type === 'npc') {
        const otherThingIdx = parseInt(otherThing.id.split('-')[1])
        fireAction({idx: otherThingIdx});
        if(map === 'forest') {
            if (fullyGeared(character.inventory) === 3) {
                if (winner === undefined || winner === 'Blue Dragon') {
                    setContents(dialogs.forest[otherThing.id].beforeFight.afterGear!.content)
                    setTimeout(()=> {
                            onGameEnd({mode: 'battle', winner: undefined, selectedOpponentIdx: otherThingIdx})
                        },500
                    )}
                if (winner === 'Jihoon') {
                    setContents(dialogs.forest[otherThing.id].afterFight.goToSky!.content)
                }
            } else {
                setContents(dialogs.forest[otherThing.id].beforeFight.beforeGear!.content)
            }
        }
        if(map==='evilKing') {
            setContents(dialogs.evilKing[otherThing.id].afterVictory.content)
        }
    }
    if (otherThing.type === 'objectNPC') {
        if ((otherThing as ObjectNPC).tookItem) {
            setContents({
                open: true,
                title: "Nothing!",
                text: `Here is nothing to take from.`,
                openerId: otherThing.id,
                action: ''
            })
        } else {
            setContents({
                open: true,
                title: "Item found!",
                text: `You found ${(otherThing as ObjectNPC).item}!`,
                openerId: otherThing.id,
                action: ''
            })
        }
    }
}