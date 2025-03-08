import { DialogActionEnum } from '@/game-ui/slices/dialogSlice';

export const evilKing = {
    'npc-1': {
        beforeFight: {
            content: {
                open: true,
                title: 'Evil King',
                text: 'Who dares to enter my dungeon!? You weakling! Come here I will teach you a lesson!',
                openerId: 'npc-1',
                action: DialogActionEnum.BATTLE_EVIL_KING,
                continue: false,
            },
        },
        afterFight: {
            lost: {
                content: {
                    open: true,
                    title: 'Evil King',
                    text: 'That was really too easy!',
                    openerId: 'npc-1',
                    action: DialogActionEnum.GAME_OVER,
                    continue: false,
                },
            },
            won: {
                content: {
                    open: true,
                    title: 'Evil King',
                    text: "That's impossible!!",
                    openerId: 'npc-1',
                    action: DialogActionEnum.VICOTRY,
                    continue: false,
                },
            },
        },
        afterVictory: {
            content: {
                open: true,
                title: 'Evil King',
                text: '.....',
                openerId: 'npc-1',
                action: DialogActionEnum.DEFAULT,
                continue: false,
            },
        },
    },
    'npc-2': {
        afterVictory: {
            content: {
                open: true,
                title: 'Princess Priska',
                text: "Thank you my Hero for defeating the Evil King. Now let's get out of here! The dungeon seems to be falling apart",
                openerId: 'npc-2',
                action: DialogActionEnum.FOLLOW_HERO,
                continue: false,
            },
        },
        exitDungeon: {
            content: {
                open: true,
                title: 'Princess Priska',
                text: 'This looks like the way out!',
                openerId: 'npc-2',
                action: DialogActionEnum.EXIT_DUNGEON,
                continue: false,
            },
        },
    },
};
