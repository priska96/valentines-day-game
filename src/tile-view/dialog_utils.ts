interface DialogsInterface {
    forest: ForestDialog;
    forest2: ForestDialog;
    piscesTown: ForestDialog;
    sky: SkyDialog;
    skyBroken: SkyDialog;
    evilKing: EvilKingDialog;
}
interface ForestDialog {
    [npcKey: string]: DialogContentsInterface;
}
interface SkyDialog {
    [npcKey: string]: DialogContentsInterface;
}
interface EvilKingDialog {
    [npcKey: string]: DialogContentsInterface;
}

interface DialogContentsInterface {
    [beforeAfterKey: string]: {
        content?: Content;
        beforeGear?: { content: Content };
        afterGear?: { content: Content };
        lost?: { content: Content };
        won?: { content: Content };
        goToSky?: { content: Content };
    };
}

interface Content {
    open: boolean;
    title: string;
    text: string;
    openerId: string;
    action: string;
}

export const dialogs: DialogsInterface = {
    forest: {
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
                        action: '',
                    },
                },
                afterGear: {
                    content: {
                        open: true,
                        title: 'Blue Dragon',
                        text: "Let's train!",
                        openerId: 'npc-0',
                        action: '',
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
                        action: '',
                    },
                },
                lost: {
                    content: {
                        open: true,
                        title: 'Blue Dragon',
                        text: "Let's try another round when you are ready!",
                        openerId: 'npc-0',
                        action: '',
                    },
                },
                goToSky: {
                    content: {
                        open: true,
                        title: 'Blue Dragon',
                        text: 'You are ready? Great! The Evil King holds the princess capture in the sky dungeon. I will bring us there now.',
                        openerId: 'npc-0',
                        action: 'go-to-sky',
                    },
                },
            },
            travelHome: {
                content: {
                    open: true,
                    title: 'Blue Dragon',
                    text: 'Hero Jihoon, thanks to you the princess is now safe. ',
                    openerId: 'npc-2',
                    action: '',
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
                    action: 'follow-hero-home',
                },
            },
        },
    },
    forest2: {
        woodenBoard: {
            readBoard: {
                content: {
                    open: true,
                    title: 'Bulletin Board',
                    text: 'Latest News: Pisces Town still under ice spell by the Evil King...\n Princess Priska still missing...',
                    openerId: 'woodenBoard',
                    action: '',
                },
            },
        },
    },
    piscesTown: {
        'npc-1': {
            afterSpell: {
                content: {
                    open: true,
                    title: 'Evil King',
                    text: '.....',
                    openerId: 'npc-1',
                    action: '',
                },
            },
        },
        'npc-2': {
            enterTown: {
                content: {
                    open: true,
                    title: 'Princes Priska',
                    text: 'Oh no!! What happened to my town? Everything is iced. Even the people turned into snowmen!\n We need to check what happened to the King! ',
                    openerId: 'npc-2',
                    action: '',
                },
            },
            beforeFight: {
                content: {
                    open: true,
                    title: 'Princes Priska',
                    text: 'Oh no, father!!! Hero Jihoon, you have to help him please!',
                    openerId: 'npc-3',
                    action: 'before-battle-evil-queen2',
                },
            },
            afterVictory: {
                content: {
                    open: true,
                    title: 'Princess Priska',
                    text: 'Thank you my hero for defeating the Evil Queen and rescuing my father.',
                    openerId: 'npc-2',
                    action: 'break-spell',
                },
            },
            spellBroken: {
                content: {
                    open: true,
                    title: 'Princess Priska',
                    text: 'Thank you so much, the ice spell is now broken.',
                    openerId: 'npc-2',
                    action: 'spell-broken',
                },
            },
            afterSpell: {
                content: {
                    open: true,
                    title: 'Princess Priska',
                    text: "I'm so glad you came into my life and helped me my Hero Jihoon.",
                    openerId: 'npc-2',
                    action: 'game-won-evil-queen',
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
                    action: 'before-battle-evil-queen',
                },
            },
            evilKingFellDown: {
                content: {
                    open: true,
                    title: 'Evil Queen',
                    text: 'Oh no what happened to my lord!? I bet that was you, Hero. I will teach you a lesson! ',
                    openerId: 'npc-3',
                    action: 'battle-evil-queen',
                },
            },
            afterFight: {
                lost: {
                    content: {
                        open: true,
                        title: 'Evil Queen',
                        text: 'That was really too easy!',
                        openerId: 'npc-3',
                        action: 'game-over-evil-queen',
                    },
                },
                won: {
                    content: {
                        open: true,
                        title: 'Evil Queen',
                        text: "That's impossible!!",
                        openerId: 'npc-3',
                        action: 'victory-evil-queen',
                    },
                },
            },
            afterVictory: {
                content: {
                    open: true,
                    title: 'Evil Queen',
                    text: '.....',
                    openerId: 'npc-3',
                    action: '',
                },
            },
            afterSpell: {
                content: {
                    open: true,
                    title: 'Evil Queen',
                    text: '.....',
                    openerId: 'npc-3',
                    action: '',
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
                    action: '',
                },
            },
            afterSpell: {
                content: {
                    open: true,
                    title: 'King of Pisces Town',
                    text: 'Thank you Hero for rescuing my daughter and freeing my people. You will be highly rewarded!!',
                    openerId: 'npc-4',
                    action: 'rewarded-king',
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
                    action: '',
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
                    action: '',
                },
            },
        },
    },
    sky: {
        'npc-0': {
            enterDungeon: {
                content: {
                    open: true,
                    title: 'Blue Dragon',
                    text: 'Are you ready to enter the dungeon?\n Then go and rescue the princess! I will wait here for you.',
                    openerId: 'npc-0',
                    action: 'enter-dungeon',
                },
            },
            leftDungeon: {
                content: {
                    open: true,
                    title: 'Blue Dragon',
                    text: 'Hero Jihoon you did it!! Thank you for saving us! We should hurry back to the forest, it seems like the dungeon is collapsing!!',
                    openerId: 'npc-0',
                    action: '',
                },
            },
        },
    },
    skyBroken: {
        'npc-0': {
            goBackToForest: {
                content: {
                    open: true,
                    title: 'Blue Dragon',
                    text: 'Quick, hold on tight! I will bring us back down!',
                    openerId: 'npc-0',
                    action: 'go-to-ground',
                },
            },
        },
    },
    evilKing: {
        'npc-1': {
            beforeFight: {
                content: {
                    open: true,
                    title: 'Evil King',
                    text: 'Who dares to enter my dungeon!? You weakling! Come here I will teach you a lesson!',
                    openerId: 'npc-1',
                    action: 'battle-evil-king',
                },
            },
            afterFight: {
                lost: {
                    content: {
                        open: true,
                        title: 'Evil King',
                        text: 'That was really too easy!',
                        openerId: 'npc-1',
                        action: 'game-over',
                    },
                },
                won: {
                    content: {
                        open: true,
                        title: 'Evil King',
                        text: "That's impossible!!",
                        openerId: 'npc-1',
                        action: 'victory',
                    },
                },
            },
            afterVictory: {
                content: {
                    open: true,
                    title: 'Evil King',
                    text: '.....',
                    openerId: 'npc-1',
                    action: '',
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
                    action: '',
                },
            },
            exitDungeon: {
                content: {
                    open: true,
                    title: 'Princess Priska',
                    text: 'This looks like the way out!',
                    openerId: 'npc-2',
                    action: 'exit-dungeon',
                },
            },
        },
    },
};
