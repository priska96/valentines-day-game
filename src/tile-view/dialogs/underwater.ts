import { DialogActionEnum } from '@/store/enums';

export const underwater = {
    'npc-26': {
        beforeFight: {
            underwater: {
                content: {
                    open: true,
                    title: 'Merman',
                    text: 'You are a human, right? You must be the hero our prophet told us about. Please help us. The Sea Monsters have been ruling over Mermaid City way too long! Please help us!',
                    openerId: 'npc-26',
                    action: DialogActionEnum.DEFAULT,
                    continue: false,
                },
            },
        },
        afterVictory: {
            underwater: {
                content: {
                    open: true,
                    title: 'Merman',
                    text: 'Hero Jihoon, you did it! Mermaid City is free again! We will never forget your bravery!',
                    openerId: 'npc-26',
                    action: DialogActionEnum.DEFAULT,
                    continue: false,
                },
            },
        },
    },
    'npc-27': {
        beforeFight: {
            underwater: {
                content: {
                    open: true,
                    title: 'Mermaid',
                    text: "My mother told me the stories about the human hero who would come to save us... I didn't believe them before, but you're real! Please, don't let the Queen fall!",
                    openerId: 'npc-27',
                    action: DialogActionEnum.DEFAULT,
                    continue: false,
                },
            },
            underwater4: {
                content: {
                    open: true,
                    title: 'Mermaid',
                    text: 'Hero, you have finally arrived! The Mermaid Queen is in grave danger! The Sea Monsters have stormed our palace, and we are struggling to fight them off.',
                    openerId: 'npc-27',
                    action: DialogActionEnum.DEFAULT,
                    continue: false,
                },
            },
        },
        afterVictory: {
            underwater: {
                content: {
                    open: true,
                    title: 'Mermaid',
                    text: 'Thank you, Hero Jihoon! The stories were true after all. You saved us!',
                    openerId: 'npc-27',
                    action: DialogActionEnum.DEFAULT,
                    continue: false,
                },
            },
            underwater4: {
                content: {
                    open: true,
                    title: 'Mermaid',
                    text: 'Our Queen is safe, our home is ours again! You will always be remembered in Mermaid City, Hero Jihoon!',
                    openerId: 'npc-27',
                    action: DialogActionEnum.DEFAULT,
                    continue: false,
                },
            },
        },
    },
    'npc-28': {
        beforeFight: {
            underwater2: {
                content: {
                    open: true,
                    title: 'Merman',
                    text: 'For centuries, the prophecy spoke of a hero from the land who would bring balance to the ocean. Now, the Queen is under attack, and only you can stop the Sea Monsters from destroying our home!',
                    openerId: 'npc-28',
                    action: DialogActionEnum.DEFAULT,
                    continue: false,
                },
            },
            underwater3: {
                content: {
                    open: true,
                    title: 'Merman',
                    text: "We fought bravely, but the Sea Monsters were too strong... The Queen is still inside the palace, but we couldn't protect her. Hero, you must finish what we could not!",
                    openerId: 'npc-28',
                    action: DialogActionEnum.DEFAULT,
                    continue: false,
                },
            },
        },
        afterVictory: {
            underwater2: {
                content: {
                    open: true,
                    title: 'Merman',
                    text: 'You are truly the hero of legend! The Sea Monsters are gone, and Mermaid City is safe again!',
                    openerId: 'npc-28',
                    action: DialogActionEnum.DEFAULT,
                    continue: false,
                },
            },
            underwater3: {
                content: {
                    open: true,
                    title: 'Merman',
                    text: 'We fought hard, but only you could defeat them. Thank you for saving our Queen and our city!',
                    openerId: 'npc-28',
                    action: DialogActionEnum.DEFAULT,
                    continue: false,
                },
            },
        },
    },
    'npc-29': {
        beforeFight: {
            underwater: {
                content: {
                    open: true,
                    title: 'Mermaid',
                    text: "The elders foretold of a human hero who would save us in our darkest hour. We have been waiting for you! Please, save our Queen before it's too late!",
                    openerId: 'npc-29',
                    action: DialogActionEnum.DEFAULT,
                    continue: false,
                },
            },
            underwater4: {
                content: {
                    open: true,
                    title: 'Mermaid',
                    text: 'The Sea Monsters came so suddenly! They destroyed our defenses and forced their way into the palace. The Queen is running out of time! You must act now!',
                    openerId: 'npc-29',
                    action: DialogActionEnum.SEA_MONSTER1_BATTLE,
                    continue: false,
                },
            },
        },
        afterVictory: {
            underwater: {
                content: {
                    open: true,
                    title: 'Mermaid',
                    text: 'You saved our Queen, our home, and our people. Hero Jihoon, we will forever be in your debt!',
                    openerId: 'npc-29',
                    action: DialogActionEnum.DEFAULT,
                    continue: false,
                },
            },
            underwater4: {
                content: {
                    open: true,
                    title: 'Mermaid',
                    text: 'The ocean sings in joy today! Thanks to you, our city is safe once more!',
                    openerId: 'npc-29',
                    action: DialogActionEnum.DEFAULT,
                    continue: false,
                },
            },
        },
    },
    'npc-30': {
        afterVictory: {
            underwater4: {
                content: {
                    open: true,
                    title: 'Mermaid Queen',
                    text: 'Thank you, brave hero! You have saved us from the Sea Monsters and restored peace to our kingdom. You have our eternal gratitude. Tell me what you desire, and I shall grant it to you.',
                    openerId: 'npc-30',
                    action: DialogActionEnum.GET_MERMAID_TEAR,
                    continue: false,
                },
            },
        },
        receiveMermaidTear: {
            underwater4: {
                content: {
                    open: true,
                    title: 'Mermaid Queen',
                    text: 'Hero Jihoon, you have proven yourself to be a true hero. I see, you came here looking for the Mermaid Tear to rescue your people. I shall grant you the Mermaid Tear, a powerful artifact that will protect you from harm. Use it wisely, and may it bring you good fortune on your journey. Also by my powers I will send you home.',
                    openerId: 'npc-30',
                    action: DialogActionEnum.RECEIVE_MERMAID_TEAR,
                    continue: false,
                },
            },
        },
    },
    'npc-31': {
        afterVictory: {
            underwater4: {
                content: {
                    open: true,
                    title: 'Sea Monster 1',
                    text: '....',
                    openerId: 'npc-31',
                    action: DialogActionEnum.DEFAULT,
                    continue: false,
                },
            },
        },
    },
    'npc-32': {
        beforeFight: {
            underwater4: {
                content: {
                    open: true,
                    title: 'Sea Monster 2',
                    text: 'What?! You defeated my brother?! I will not let you get away with this! Prepare to face my wrath!',
                    openerId: 'npc-32',
                    action: DialogActionEnum.SEA_MONSTER2_BATTLE,
                    continue: false,
                },
            },
        },
        afterFight: {
            underwater4: {
                content: {
                    open: true,
                    title: 'Sea Monster 2',
                    text: 'How could this be...? I am the strongest of my kind...',
                    openerId: 'npc-32',
                    action: DialogActionEnum.VICTORY_SEA_MONSTERS,
                    continue: false,
                },
            },
        },
        afterVictory: {
            underwater4: {
                content: {
                    open: true,
                    title: 'Sea Monster 2',
                    text: '....',
                    openerId: 'npc-32',
                    action: DialogActionEnum.DEFAULT,
                    continue: false,
                },
            },
        },
    },
};
