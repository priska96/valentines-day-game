import { ObjectNPC } from '@/tile-view/objectNPC/slices/objectSlice';

export const dragonSword = {
    id: 'object-7',
    x: 0,
    y: 0,
    item: 'Dragon Sword',
    objectImg: null,
    type: 'objectNPC',
    map: ['piscesTown3Melted'],
    tookItem: true,
    healing: 0,
    action: '',
    inUse: false,
} as ObjectNPC;

export const underWaterPotion = {
    id: 'object-8',
    x: 0,
    y: 0,
    item: 'Underwater Potion',
    objectImg: null,
    type: 'objectNPC',
    map: ['piscesTown3Melted'],
    tookItem: true,
    healing: 0,
    action: 'use-underwater-potion',
    inUse: false,
} as ObjectNPC;

export const mermaidTear = {
    id: 'object-8',
    x: 0,
    y: 0,
    item: 'Mermaid Tear',
    objectImg: null,
    type: 'objectNPC',
    map: ['underwater4'],
    tookItem: true,
    healing: 0,
    action: '',
    inUse: false,
} as ObjectNPC;
