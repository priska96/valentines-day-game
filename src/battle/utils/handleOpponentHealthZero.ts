import {
    CharSummary,
    DialogState,
    NPCSummary,
    SetContentsPayload,
    UpdatePlayerSummaryPayloadChar,
} from '@/store/types';
import { dialogs, NestedDialog } from '@/tile-view/dialog_utils';

interface HandleOpponentHealthZeroProps {
    npcSummary: NPCSummary;
    playerSummary: CharSummary;
    updatePlayerSummary: (payload: UpdatePlayerSummaryPayloadChar) => void;
    setContents: (payload: SetContentsPayload) => void;
    playerHealth: number;
}

export const handleOpponentHealthZero = ({
    npcSummary,
    playerSummary,
    updatePlayerSummary,
    setContents,
    playerHealth,
}: HandleOpponentHealthZeroProps) => {
    switch (npcSummary.name) {
        case 'Blue Dragon': {
            updatePlayerSummary({
                updates: {
                    level: 3,
                    health: playerHealth,
                    maxHealth: 250,
                    attack: 85,
                    magic: 55,
                    defense: 45,
                    magicDefense: 35,
                },
            });
            setTimeout(() => {
                setContents(
                    (dialogs.forest['npc-0'].afterFight.won as NestedDialog)
                        .content as DialogState
                );
            }, 500);
            break;
        }
        case 'Evil King': {
            updatePlayerSummary({
                updates: {
                    level: 12,
                    health: playerHealth,
                    maxHealth: 450,
                    attack: 100,
                    magic: 75,
                    defense: 55,
                    magicDefense: 55,
                },
            });
            setTimeout(() => {
                setContents(
                    (dialogs.evilKing['npc-1'].afterFight.won as NestedDialog)
                        .content as DialogState
                );
            }, 500);
            break;
        }
        case 'Evil Queen': {
            updatePlayerSummary({
                updates: {
                    level: 17,
                    health: playerHealth,
                    maxHealth: 650,
                    attack: 130,
                    magic: 85,
                    defense: 70,
                    magicDefense: 65,
                },
            });
            setTimeout(() => {
                setContents(
                    (dialogs.piscesTown['npc-3'].afterFight.won as NestedDialog)
                        .content as DialogState
                );
            }, 500);
            break;
        }
        case 'Sea Monster 1': {
            setTimeout(() => {
                setContents(
                    (
                        dialogs.underwater['npc-32'].beforeFight
                            .underwater4 as NestedDialog
                    ).content as DialogState
                );
            }, 500);
            break;
        }
        case 'Sea Monster 2': {
            updatePlayerSummary({
                updates: {
                    level: 25,
                    health: playerHealth,
                    maxHealth: 850,
                    attack: 170,
                    magic: 95,
                    defense: 100,
                    magicDefense: 95,
                },
            });
            setTimeout(() => {
                setContents(
                    (
                        dialogs.underwater['npc-32'].afterFight
                            .underwater4 as NestedDialog
                    ).content as DialogState
                );
            }, 500);
            break;
        }
        default: {
            updatePlayerSummary({
                updates: {
                    level: playerSummary.level + 0.5,
                    health: playerHealth,
                    maxHealth: playerSummary.maxHealth + 30,
                    attack: playerSummary.attack + 10,
                    magic: playerSummary.magic + 5,
                    defense: playerSummary.defense + 15,
                    magicDefense: playerSummary.magicDefense + 5,
                },
            });
        }
    }
};
