export const dialogs = {
    forest:{
        "npc-0":{
            beforeFight:{
                beforeGear: {
                    content: {
                        open: true,
                        title: "Blue Dragon",
                        text: "Hi, oh mighty hero! Help us free our land and rescue princess Pri~~\n " +
                            "But fist you should find some armor and practice the sword fighting. \nCome back when you found your gear so we can train!",
                        openerId: "npc-0",
                        action: ''
                    }
                },
                afterGear: {
                    content: {
                        open: true,
                        title: "Blue Dragon",
                        text: "Let's train!",
                        openerId: "npc-0",
                        action: ''
                    }
                },
            },
            afterFight: {
                won: {
                    content: {
                        open: true,
                        title: 'Blue Dragon',
                        text: 'You are a true swordsman! I believe you are ready to fight the evil King and rescue the princess! Let me know when you want to leave.',
                        openerId: 'npc-0',
                        action: ''
                    }
                },
                lost: {
                    content: {
                        open: true,
                        title: 'Blue Dragon',
                        text: "Let's try another round when you are ready!",
                        openerId: 'npc-0',
                        action: ''
                    }
                },
                goToSky: {
                    content: {
                        open: true,
                        title: 'Blue Dragon',
                        text: 'You are ready? Great! The Evil King holds the princess capture in the sky dungeon. I will bring us there now.',
                        openerId: 'npc-0',
                        action: 'go-to-sky'
                    }
                },
            }
        }
    },
    sky:{
        "npc-0":{
            enterDungeon: {
                content: {
                    open: true,
                    title: "Blue Dragon",
                    text: "Are you ready to enter the dungeon?\n Then go and rescue the princess! I will wait here for you.",
                    openerId: 'npc-0',
                    action: 'enter-dungeon'
                }
            },
            leftDungeon:{
                content: {
                    open: true,
                    title: "Blue Dragon",
                    text: "Hero Jihoon you did it!! Thank you for saving us!",
                    openerId: 'npc-0',
                    action: 'game-won'
                }
            }
        }
    },
    evilKing:{
        "npc-1":{
            beforeFight:{
                content:  {
                    open: true,
                    title: "Evil King",
                    text: "Who dares to enter my dungeon!? You weakling! Come here I will teach you a lesson!",
                    openerId: "npc-1",
                    action: 'battle-evil-king'
                }
            },
            afterFight:{
                lost:{
                    content:  {
                        open: true,
                        title: "Evil King",
                        text: "That was really too easy!",
                        openerId: "npc-1",
                        action: 'game-over'
                    }
                },
                won: {
                    content:  {
                        open: true,
                        title: "Evil King",
                        text: "That's impossible!!",
                        openerId: "npc-1",
                        action: 'victory'
                    }
                }
            },
            afterVictory: {
                content:  {
                    open: true,
                    title: "Evil King",
                    text: ".....",
                    openerId: "npc-1",
                    action: ''
                }
            }
        },
        "npc-2":{
            afterVictory: {
                content:  {
                    open: true,
                    title: "Princess Priska",
                    text: "Thank you my hero for defeating the Evil King. Now let's get out of here!~",
                    openerId: "npc-2",
                    action: 'leave-dungeon'
                }
            }
        }
    }
}
