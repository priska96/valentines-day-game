import { SetContentsAction } from '@/game-ui/slices/dialogSlice';
import { UpdatePlayerSummaryAction } from '@/tile-view/character/slices/characterSlice';
import { dialogs, NestedDialog } from '@/tile-view/dialog_utils';
import { NPCSummary } from '@/tile-view/npc/slices/npcSlice';
import { GameModeEnum, onGameEnd } from '@/tile-view/slices/statusSlice';
import { ActionCreatorWithPayload } from '@reduxjs/toolkit';

interface HandlePlayerHealthZeroProps {
    npcSummary: NPCSummary;
    updatePlayerSummary: ActionCreatorWithPayload<
        UpdatePlayerSummaryAction,
        'character/updatePlayerSummary'
    >;
    setContents: ActionCreatorWithPayload<
        SetContentsAction,
        'dialog/setContents'
    >;
    playerHealth: number;
}

export const handlePlayerHealthZero = ({
    npcSummary,
    updatePlayerSummary,
    setContents,
    playerHealth,
}: HandlePlayerHealthZeroProps) => {
    switch (npcSummary.name) {
        case 'Blue Dragon': {
            setContents(
                (dialogs.forest['npc-0'].afterFight.lost as NestedDialog)
                    .content as SetContentsAction
            );
            break;
        }
        case 'Evil King': {
            setContents(
                (dialogs.evilKing['npc-1'].afterFight.lost as NestedDialog)
                    .content as SetContentsAction
            );
            break;
        }
        case 'Evil Queen': {
            setContents(
                (dialogs.piscesTown['npc-3'].afterFight.lost as NestedDialog)
                    .content as SetContentsAction
            );
            break;
        }
        default: {
            onGameEnd({
                mode: GameModeEnum.WORLD,
                winner: npcSummary.name,
                selectedOpponentIdx: 0,
            });
        }
    }
    updatePlayerSummary({ updates: { health: playerHealth } });
};
