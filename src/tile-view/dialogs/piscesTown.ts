import { DialogActionEnum } from '@/game-ui/slices/dialogSlice';

export const piscesTown = {
    'npc-2': {
        enterTown: {
            content: {
                open: true,
                title: 'Princess Priska',
                text: 'Oh no!! What happened to my town? Everything is iced. Even the people turned into snowmen!\n We need to check what happened to the King! ',
                openerId: 'npc-2',
                action: DialogActionEnum.DEFAULT,
                continue: false,
            },
        },
        beforeFight: {
            content: {
                open: true,
                title: 'Princess Priska',
                text: 'Oh no, father!!! Hero Jihoon, you have to help him please!',
                openerId: 'npc-3',
                action: DialogActionEnum.BEFORE_BATTLE_EVIL_QUEEN2,
                continue: false,
            },
        },
        afterVictory: {
            content: {
                open: true,
                title: 'Princess Priska',
                text: 'Thank you my hero for defeating the Evil Queen and rescuing my father.',
                openerId: 'npc-2',
                action: DialogActionEnum.BREAK_SPELL,
                continue: false,
            },
        },
        spellBroken: {
            content: {
                open: true,
                title: 'Princess Priska',
                text: 'Thank you so much, the ice spell is now broken.',
                openerId: 'npc-2',
                action: DialogActionEnum.SPELL_BROKEN,
                continue: false,
            },
        },
    },

    'npc-3': {
        beforeFight: {
            content: {
                open: true,
                title: 'Evil Queen',
                text: 'This is the last one standing! King of Pisces Town here comes your end! ',
                openerId: 'npc-3',
                action: DialogActionEnum.BEFORE_BATTLE_EVIL_QUEEN,
                continue: false,
            },
        },
        evilKingFellDown: {
            content: {
                open: true,
                title: 'Evil Queen',
                text: 'Oh no what happened to my lord!? I bet that was you, Hero. I will teach you a lesson! ',
                openerId: 'npc-3',
                action: DialogActionEnum.BATTLE_EVIL_QUEEN,
                continue: false,
            },
        },
        afterFight: {
            lost: {
                content: {
                    open: true,
                    title: 'Evil Queen',
                    text: 'That was really too easy!',
                    openerId: 'npc-3',
                    action: DialogActionEnum.GAME_OVER_EVIL_QUEEN,
                    continue: false,
                },
            },
            won: {
                content: {
                    open: true,
                    title: 'Evil Queen',
                    text: "That's impossible!!",
                    openerId: 'npc-3',
                    action: DialogActionEnum.VICTORY_EVIL_QUEEN,
                    continue: false,
                },
            },
        },
        afterVictory: {
            content: {
                open: true,
                title: 'Evil Queen',
                text: '.....',
                openerId: 'npc-3',
                action: DialogActionEnum.DEFAULT,
                continue: false,
            },
        },
    },
    'npc-4': {
        afterVictory: {
            content: {
                open: true,
                title: 'King of Pisces Town',
                text: 'Thank you Hero for rescuing my daughter and freeing my people. You will be highly rewarded!!',
                openerId: 'npc-4',
                action: DialogActionEnum.REWARDED_KING,
                continue: true,
            },
        },
    },
    'npc-5': {
        afterSpell: {
            content: {
                open: true,
                title: 'Servant 1',
                text: 'Thank you Hero!',
                openerId: 'npc-5',
                action: DialogActionEnum.DEFAULT,
                continue: false,
            },
        },
    },
    'npc-6': {
        afterSpell: {
            content: {
                open: true,
                title: 'Servant 2',
                text: 'I was so scared and thought I would continue being a snowman. Thank you!',
                openerId: 'npc-6',
                action: DialogActionEnum.DEFAULT,
                continue: false,
            },
        },
    },
};

export const piscesTownMelted = {
    'npc-1': {
        afterSpell: {
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
        afterSpell: {
            content: {
                open: true,
                title: 'Princess Priska',
                text: "I'm so glad you came into my life and helped me my Hero Jihoon.",
                openerId: 'npc-2',
                action: DialogActionEnum.DEFAULT,
                continue: false,
            },
        },
    },

    'npc-3': {
        afterVictory: {
            content: {
                open: true,
                title: 'Evil Queen',
                text: '.....',
                openerId: 'npc-3',
                action: DialogActionEnum.DEFAULT,
                continue: false,
            },
        },
        afterSpell: {
            content: {
                open: true,
                title: 'Evil Queen',
                text: '.....',
                openerId: 'npc-3',
                action: DialogActionEnum.DEFAULT,
                continue: false,
            },
        },
    },
    'npc-4': {
        afterVictory: {
            content: {
                open: true,
                title: 'King of Pisces Town',
                text: 'Thank you Hero for rescuing my daughter and freeing my people. You will be highly rewarded!!',
                openerId: 'npc-4',
                action: DialogActionEnum.REWARDED_KING,
                continue: true,
            },
        },
        afterSpell: {
            content: {
                open: true,
                title: 'King of Pisces Town',
                text: 'Thank you Hero for rescuing my daughter and freeing my people. You will be highly rewarded!!',
                openerId: 'npc-4',
                action: DialogActionEnum.REWARDED_KING,
                continue: true,
            },
        },
        getReward: {
            content: {
                open: true,
                title: 'King of Pisces Town',
                text: 'Hero Jihoon, I have a reward for you. Please take my sword. It was made out of dragon teeth which is the most durable material. It will help you in your journey.',
                openerId: 'npc-4',
                action: DialogActionEnum.RECEIVE_SWORD,
                continue: false,
            },
        },
        afterReward: {
            content: {
                open: true,
                title: 'King of Pisces Town',
                text: 'Good luck on your journey.',
                openerId: 'npc-4',
                action: DialogActionEnum.DEFAULT,
                continue: false,
            },
        },
    },
    'npc-5': {
        afterSpell: {
            content: {
                open: true,
                title: 'Servant 1',
                text: 'Thank you Hero!',
                openerId: 'npc-5',
                action: DialogActionEnum.DEFAULT,
                continue: false,
            },
        },
    },
    'npc-6': {
        afterSpell: {
            content: {
                open: true,
                title: 'Servant 2',
                text: 'I was so scared and thought I would continue being a snowman. Thank you!',
                openerId: 'npc-6',
                action: DialogActionEnum.DEFAULT,
                continue: false,
            },
        },
    },
};
