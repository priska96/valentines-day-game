import { DialogActionEnum } from '@/store/enums';

export const forest = {
    'npc-0': {
        beforeFight: {
            beforeGear: {
                content: {
                    open: true,
                    title: 'Blue Dragon',
                    text:
                        'Hi, oh mighty hero! Help us free our land and rescue princess Pri~~\n ' +
                        'But fist you should find some armor and practice the sword fighting. \nCome back when you found your gear so we can train!',
                    openerId: 'npc-0',
                    action: DialogActionEnum.DEFAULT,
                    continue: false,
                },
            },
            afterGear: {
                content: {
                    open: true,
                    title: 'Blue Dragon',
                    text: "Let's train!",
                    openerId: 'npc-0',
                    action: DialogActionEnum.DEFAULT,
                    continue: false,
                },
            },
        },
        afterFight: {
            won: {
                content: {
                    open: true,
                    title: 'Blue Dragon',
                    text: 'You are a true swordsman! I believe you are ready to fight the Evil King and rescue the princess! Let me know when you want to leave.',
                    openerId: 'npc-0',
                    action: DialogActionEnum.DEFAULT,
                    continue: false,
                },
            },
            lost: {
                content: {
                    open: true,
                    title: 'Blue Dragon',
                    text: "Let's try another round when you are ready!",
                    openerId: 'npc-0',
                    action: DialogActionEnum.DEFAULT,
                    continue: false,
                },
            },
            goToSky: {
                content: {
                    open: true,
                    title: 'Blue Dragon',
                    text: 'You are ready? Great! The Evil King holds the princess capture in the sky dungeon. I will bring us there now.',
                    openerId: 'npc-0',
                    action: DialogActionEnum.GO_TO_SKY,
                    continue: false,
                },
            },
        },
        travelHome: {
            content: {
                open: true,
                title: 'Blue Dragon',
                text: 'Hero Jihoon, thanks to you the princess is now safe. ',
                openerId: 'npc-2',
                action: DialogActionEnum.DEFAULT,
                continue: false,
            },
        },
    },
    'npc-2': {
        travelHome: {
            content: {
                open: true,
                title: 'Princess Priska',
                text:
                    'Hero Jihoon, I really need to go home. ' +
                    "I'm afraid the falling rocks from Sky Island destroyed my home. " +
                    'I need to be there for my people. Can you bring me back to my town?',
                openerId: 'npc-2',
                action: DialogActionEnum.FOLLOW_HERO_HOME,
                continue: false,
            },
        },
    },
};
export const forest2 = {
    woodenBoard: {
        readBoard: {
            content: {
                open: true,
                title: 'Bulletin Board',
                text: 'Latest News: Pisces Town still under ice spell by the Evil King...\n Princess Priska still missing...',
                openerId: 'woodenBoard',
                action: DialogActionEnum.DEFAULT,
                continue: false,
            },
        },
    },
    woodenBoardAfterVictoryEvilQueen: {
        readBoard: {
            content: {
                open: true,
                title: 'Bulletin Board',
                text: 'Latest News: Pisces Town ice spell finally broken...\n Princess Priska was rescued...',
                openerId: 'woodenBoard',
                action: DialogActionEnum.DEFAULT,
                continue: false,
            },
        },
    },
};
