import { DialogActionEnum } from '@/game-ui/slices/dialogSlice';
import { collectMermaidTear } from '../action_utils';

export const piscesTown = {
    'npc-1': {
        afterSpell: {
            content: {
                open: true,
                title: 'Evil King',
                text: '... ..',
                openerId: 'npc-1',
                action: DialogActionEnum.DEFAULT,
                continue: false,
            },
        },
    },
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
            // can be called while explosion is happening, but might also not be
            content: {
                open: true,
                title: 'Princess Priska',
                text: 'Thank you my hero for defeating the Evil Queen and rescuing my father.',
                openerId: 'npc-2',
                action: DialogActionEnum.DEFAULT,
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
        chapter3: {
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
        chapter3: {
            content: {
                open: true,
                title: 'Princess Priska',
                text: "I'm so proud of you Hero Jihoon! You received the sword from the King.",
                openerId: 'npc-2',
                action: DialogActionEnum.DEFAULT,
                continue: false,
            },
        },
        collectMermaidTear: {
            content: {
                open: true,
                title: 'Princess Priska',
                text: 'Oh no, what is happening?! I can feel something bad is about to happen. Pisces Town is becomming weaker. Hero Jihoon, we need to collect the tears of the mermaids to restore the balance of power in Pisces Town.',
                openerId: 'npc-2',
                action: DialogActionEnum.DEFAULT,
                continue: false,
            },
        },
        receivedPotion: {
            content: {
                open: true,
                title: 'Princess Priska',
                text: 'Hero Jihoon, I believe in you. I hope you can find a way to restore the balance of power in Pisces Town. I feel we are running out of time.',
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
        chapter3: {
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
        chapter3: {
            content: {
                open: true,
                title: 'King of Pisces Town',
                text: 'Good luck on your journey.',
                openerId: 'npc-4',
                action: DialogActionEnum.SEER_COMES_OUT,
                continue: false,
            },
        },
        receivedPotion: {
            content: {
                open: true,
                title: 'King of Pisces Town',
                text: 'We believe in you Hero Jihoon! Once again we ask you to help and rescue us! Good luck on your journey.',
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
        chapter3: {
            content: {
                open: true,
                title: 'Servant 1',
                text: 'Thank you Hero!',
                openerId: 'npc-5',
                action: DialogActionEnum.DEFAULT,
                continue: false,
            },
        },
        collectMermaidTear: {
            content: {
                open: true,
                title: 'Servant 1',
                text: 'I am so scared. Hero Jihoon you need to help us!',
                openerId: 'npc-5',
                action: DialogActionEnum.DEFAULT,
                continue: false,
            },
        },
        receivedPotion: {
            content: {
                open: true,
                title: 'Servant 1',
                text: 'I wonder how you can find mermaids. I thought they were just a myth.',
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
        chapter3: {
            content: {
                open: true,
                title: 'Servant 2',
                text: 'I was so scared and thought I would continue being a snowman. Thank you!',
                openerId: 'npc-6',
                action: DialogActionEnum.DEFAULT,
                continue: false,
            },
        },
        collectMermaidTear: {
            content: {
                open: true,
                title: 'Servant 2',
                text: 'I wonder how you can find mermaids. I thought they were just a myth.',
                openerId: 'npc-6',
                action: DialogActionEnum.DEFAULT,
                continue: false,
            },
        },
        receivedPotion: {
            content: {
                open: true,
                title: 'Servant 2',
                text: 'I wonder how you can find mermaids. I thought they were just a myth.',
                openerId: 'npc-6',
                action: DialogActionEnum.DEFAULT,
                continue: false,
            },
        },
    },
    'npc-10': {
        chapter3: {
            content: {
                open: true,
                title: 'Ancient Seer',
                text: 'My King!! Due to the ice spell the crystals that maintained the balance of power in Pisces Town were cracked. The only way to restore the balance is to gather tears of the fairies to fill the cracks.',
                openerId: 'npc-10',
                action: DialogActionEnum.COLLECT_MERMAID_TEAR,
                continue: false,
            },
        },
        collectMermaidTear: {
            content: {
                open: true,
                title: 'Ancient Seer',
                text: 'Here Hero Jihoon. Take this potion. It will help you to breath under water.',
                openerId: 'npc-10',
                action: DialogActionEnum.RECEIVE_POTION,
                continue: false,
            },
        },
        receivedPotion: {
            content: {
                open: true,
                title: 'Ancient Seer',
                text: 'Come back to me when you have collected all the tears.',
                openerId: 'npc-10',
                action: DialogActionEnum.DEFAULT,
                continue: false,
            },
        },
    },
    'npc-11': {
        afterSpell: {
            content: {
                open: true,
                title: 'Citizen 1',
                text: 'Thank you, Hero Jihoon! Without you, we would still be frozen in fear and ice.',
                openerId: 'npc-11',
                action: DialogActionEnum.DEFAULT,
                continue: false,
            },
        },
        chapter3: {
            content: {
                open: true,
                title: 'Citizen 1',
                text: 'Thank you, Hero Jihoon! Without you, we would still be frozen in fear and ice.',
                openerId: 'npc-11',
                action: DialogActionEnum.DEFAULT,
                continue: false,
            },
        },
        collectMermaidTear: {
            content: {
                open: true,
                title: 'Citizen 1',
                text: 'I still can’t believe the ice spell is broken. But why do these earthquakes keep happening? Could it be related?',
                openerId: 'npc-11',
                action: DialogActionEnum.DEFAULT,
                continue: false,
            },
        },
        receivedPotion: {
            content: {
                open: true,
                title: 'Citizen 1',
                text: "I still can't believe the ice spell is broken. But why do these earthquakes keep happening? Could it be related?",
                openerId: 'npc-11',
                action: DialogActionEnum.DEFAULT,
                continue: false,
            },
        },
    },
    'npc-12': {
        afterSpell: {
            content: {
                open: true,
                title: 'Citizen 2',
                text: 'Our suffering is over, all thanks to you, Hero Jihoon! The town is forever in your debt.',
                openerId: 'npc-12',
                action: DialogActionEnum.DEFAULT,
                continue: false,
            },
        },
        chapter3: {
            content: {
                open: true,
                title: 'Citizen 2',
                text: 'Our suffering is over, all thanks to you, Hero Jihoon! The town is forever in your debt.',
                openerId: 'npc-12',
                action: DialogActionEnum.DEFAULT,
                continue: false,
            },
        },
        collectMermaidTear: {
            content: {
                open: true,
                title: 'Citizen 2',
                text: 'We were trapped under ice for so long... and now the ground shakes as if something is waking up beneath us.',
                openerId: 'npc-12',
                action: DialogActionEnum.DEFAULT,
                continue: false,
            },
        },
        receivedPotion: {
            content: {
                open: true,
                title: 'Citizen 2',
                text: 'We were trapped under ice for so long... and now the ground shakes as if something is waking up beneath us.',
                openerId: 'npc-12',
                action: DialogActionEnum.DEFAULT,
                continue: false,
            },
        },
    },
    'npc-13': {
        afterSpell: {
            content: {
                open: true,
                title: 'Citizen 3',
                text: 'Our town shines bright once more, all thanks to your bravery. Thank you, Hero Jihoon!',
                openerId: 'npc-13',
                action: DialogActionEnum.DEFAULT,
                continue: false,
            },
        },
        chapter3: {
            content: {
                open: true,
                title: 'Citizen 3',
                text: 'Our town shines bright once more, all thanks to your bravery. Thank you, Hero Jihoon!',
                openerId: 'npc-13',
                action: DialogActionEnum.DEFAULT,
                continue: false,
            },
        },
        collectMermaidTear: {
            content: {
                open: true,
                title: 'Citizen 3',
                text: 'Thank you, Hero Jihoon, for saving our town. But... I fear our troubles are not over yet.',
                openerId: 'npc-13',
                action: DialogActionEnum.DEFAULT,
                continue: false,
            },
        },
        receivedPotion: {
            content: {
                open: true,
                title: 'Citizen 3',
                text: 'Thank you, Hero Jihoon, for saving our town. But... I fear our troubles are not over yet.',
                openerId: 'npc-13',
                action: DialogActionEnum.DEFAULT,
                continue: false,
            },
        },
    },
    'npc-14': {
        afterSpell: {
            content: {
                open: true,
                title: 'Citizen 4',
                text: 'Hero Jihoon, you have given us a second chance. We will never forget your kindness!',
                openerId: 'npc-14',
                action: DialogActionEnum.DEFAULT,
                continue: false,
            },
        },
        chapter3: {
            content: {
                open: true,
                title: 'Citizen 4',
                text: 'Hero Jihoon, you have given us a second chance. We will never forget your kindness!',
                openerId: 'npc-14',
                action: DialogActionEnum.DEFAULT,
                continue: false,
            },
        },
        collectMermaidTear: {
            content: {
                open: true,
                title: 'Citizen 4',
                text: 'These tremors are getting worse! Are we truly safe now, or is another disaster coming?',
                openerId: 'npc-14',
                action: DialogActionEnum.DEFAULT,
                continue: false,
            },
        },
        receivedPotion: {
            content: {
                open: true,
                title: 'Citizen 4',
                text: 'These tremors are getting worse! Are we truly safe now, or is another disaster coming?',
                openerId: 'npc-14',
                action: DialogActionEnum.DEFAULT,
                continue: false,
            },
        },
    },
    'npc-15': {
        afterSpell: {
            content: {
                open: true,
                title: 'Citizen 5',
                text: 'Because of you, my family is safe again. Thank you, Hero Jihoon, from the bottom of our hearts!',
                openerId: 'npc-15',
                action: DialogActionEnum.DEFAULT,
                continue: false,
            },
        },
        chapter3: {
            content: {
                open: true,
                title: 'Citizen 5',
                text: 'Because of you, my family is safe again. Thank you, Hero Jihoon, from the bottom of our hearts!',
                openerId: 'npc-15',
                action: DialogActionEnum.DEFAULT,
                continue: false,
            },
        },
        collectMermaidTear: {
            content: {
                open: true,
                title: 'Citizen 5',
                text: 'My family barely survived the ice spell. Now we live in fear of the ground swallowing us whole. Hero Jihoon, please help us!',
                openerId: 'npc-15',
                action: DialogActionEnum.DEFAULT,
                continue: false,
            },
        },
        receivedPotion: {
            content: {
                open: true,
                title: 'Citizen 5',
                text: 'My family barely survived the ice spell. Now we live in fear of the ground swallowing us whole. Hero Jihoon, please help us!',
                openerId: 'npc-15',
                action: DialogActionEnum.DEFAULT,
                continue: false,
            },
        },
    },
    'npc-16': {
        afterSpell: {
            content: {
                open: true,
                title: 'Citizen 6',
                text: 'Pisces Town is free, and we owe it all to you. Thank you, Hero Jihoon!',
                openerId: 'npc-16',
                action: DialogActionEnum.DEFAULT,
                continue: false,
            },
        },
        chapter3: {
            content: {
                open: true,
                title: 'Citizen 6',
                text: 'Pisces Town is free, and we owe it all to you. Thank you, Hero Jihoon!',
                openerId: 'npc-16',
                action: DialogActionEnum.DEFAULT,
                continue: false,
            },
        },
        collectMermaidTear: {
            content: {
                open: true,
                title: 'Citizen 6',
                text: 'I heard some say the ice spell was a warning... but a warning for what? The earthquakes feel unnatural.',
                openerId: 'npc-16',
                action: DialogActionEnum.DEFAULT,
                continue: false,
            },
        },
        receivedPotion: {
            content: {
                open: true,
                title: 'Citizen 6',
                text: 'I heard some say the ice spell was a warning...  but a warning for what? The earthquakes feel unnatural.',
                openerId: 'npc-16',
                action: DialogActionEnum.DEFAULT,
                continue: false,
            },
        },
    },
    'npc-17': {
        afterSpell: {
            content: {
                open: true,
                title: 'Citizen 7',
                text: 'You have proven yourself a true hero. Thank you for restoring peace to our town!',
                openerId: 'npc-17',
                action: DialogActionEnum.DEFAULT,
                continue: false,
            },
        },
        chapter3: {
            content: {
                open: true,
                title: 'Citizen 7',
                text: 'You have proven yourself a true hero. Thank you for restoring peace to our town!',
                openerId: 'npc-17',
                action: DialogActionEnum.DEFAULT,
                continue: false,
            },
        },
        collectMermaidTear: {
            content: {
                open: true,
                title: 'Citizen 7',
                text: 'Pisces Town was frozen, and now it shakes as if the land itself is angry. What do we do now, Hero Jihoon?',
                openerId: 'npc-17',
                action: DialogActionEnum.DEFAULT,
                continue: false,
            },
        },
        receivedPotion: {
            content: {
                open: true,
                title: 'Citizen 7',
                text: 'Pisces Town was frozen, and now it shakes as if the land itself is angry. What do we do now, Hero Jihoon?',
                openerId: 'npc-17',
                action: DialogActionEnum.DEFAULT,
                continue: false,
            },
        },
    },
    'npc-18': {
        afterSpell: {
            content: {
                open: true,
                title: 'Citizen 8',
                text: 'You have given us warmth and hope again. We will always remember your bravery!',
                openerId: 'npc-18',
                action: DialogActionEnum.DEFAULT,
                continue: false,
            },
        },
        chapter3: {
            content: {
                open: true,
                title: 'Citizen 8',
                text: 'You have given us warmth and hope again. We will always remember your bravery!',
                openerId: 'npc-18',
                action: DialogActionEnum.DEFAULT,
                continue: false,
            },
        },
        collectMermaidTear: {
            content: {
                open: true,
                title: 'Citizen 8',
                text: 'I overheard an elder speaking of an ancient force beneath Pisces Town... something that should never have been disturbed.',
                openerId: 'npc-18',
                action: DialogActionEnum.DEFAULT,
                continue: false,
            },
        },
        receivedPotion: {
            content: {
                open: true,
                title: 'Citizen 8',
                text: 'I overheard an elder speaking of an ancient force beneath Pisces Town... something that should never have been disturbed.',
                openerId: 'npc-18',
                action: DialogActionEnum.DEFAULT,
                continue: false,
            },
        },
    },
    'npc-19': {
        afterSpell: {
            content: {
                open: true,
                title: 'Citizen 9',
                text: 'Pisces Town has been saved! Thank you, Hero Jihoon, for your courage!',
                openerId: 'npc-19',
                action: DialogActionEnum.DEFAULT,
                continue: false,
            },
        },
        chapter3: {
            content: {
                open: true,
                title: 'Citizen 9',
                text: 'Pisces Town has been saved! Thank you, Hero Jihoon, for your courage!',
                openerId: 'npc-19',
                action: DialogActionEnum.DEFAULT,
                continue: false,
            },
        },
        collectMermaidTear: {
            content: {
                open: true,
                title: 'Citizen 9',
                text: 'The shaking is growing worse. What if we are facing something even more dangerous than the ice spell?',
                openerId: 'npc-19',
                action: DialogActionEnum.DEFAULT,
                continue: false,
            },
        },
        receivedPotion: {
            content: {
                open: true,
                title: 'Citizen 9',
                text: 'The shaking is growing worse. What if we are facing something even more dangerous than the ice spell?',
                openerId: 'npc-19',
                action: DialogActionEnum.DEFAULT,
                continue: false,
            },
        },
    },
    'npc-20': {
        afterSpell: {
            content: {
                open: true,
                title: 'Citizen 10',
                text: 'We are free at last! Thank you, Hero Jihoon, for your kindness and strength!',
                openerId: 'npc-20',
                action: DialogActionEnum.DEFAULT,
                continue: false,
            },
        },
        chapter3: {
            content: {
                open: true,
                title: 'Citizen 10',
                text: 'We are free at last! Thank you, Hero Jihoon, for your kindness and strength!',
                openerId: 'npc-20',
                action: DialogActionEnum.DEFAULT,
                continue: false,
            },
        },
        collectMermaidTear: {
            content: {
                open: true,
                title: 'Citizen 10',
                text: 'There are rumors about a hidden well that leads to the mermaid city. Maybe they know something about these earthquakes…',
                openerId: 'npc-20',
                action: DialogActionEnum.DEFAULT,
                continue: false,
            },
        },
        receivedPotion: {
            content: {
                open: true,
                title: 'Citizen 10',
                text: 'There are rumors about a hidden well that leads to the mermaid city. Maybe they know something about these earthquakes…',
                openerId: 'npc-20',
                action: DialogActionEnum.DEFAULT,
                continue: false,
            },
        },
    },
};
