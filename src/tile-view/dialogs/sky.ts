import { DialogActionEnum } from '@/game-ui/slices/dialogSlice';

export const sky = {
    'npc-0': {
        enterDungeon: {
            content: {
                open: true,
                title: 'Blue Dragon',
                text: 'Are you ready to enter the dungeon?\n Then go and rescue the princess! I will wait here for you.',
                openerId: 'npc-0',
                action: DialogActionEnum.ENTER_DUNGEON,
                continue: false,
            },
        },
        leftDungeon: {
            content: {
                open: true,
                title: 'Blue Dragon',
                text: 'Hero Jihoon you did it!! Thank you for saving us! We should hurry back to the forest, it seems like the dungeon is collapsing!!',
                openerId: 'npc-0',
                action: DialogActionEnum.DEFAULT,
                continue: false,
            },
        },
    },
};
export const skyBroken = {
    'npc-0': {
        goBackToForest: {
            content: {
                open: true,
                title: 'Blue Dragon',
                text: 'Quick, hold on tight! I will bring us back down!',
                openerId: 'npc-0',
                action: DialogActionEnum.GO_TO_GROUND,
                continue: false,
            },
        },
    },
};
