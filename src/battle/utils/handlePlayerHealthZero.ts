import { GameModeEnum } from '@/store/enums';
import {
    NPCSummary,
    OnGameEndPayload,
    SetContentsPayload,
    UpdatePlayerSummaryPayloadChar,
} from '@/store/types';
import { dialogs, NestedDialog } from '@/tile-view/dialog_utils';

interface HandlePlayerHealthZeroProps {
    npcSummary: NPCSummary;
    updatePlayerSummary: (payload: UpdatePlayerSummaryPayloadChar) => void;
    setContents: (payload: SetContentsPayload) => void;
    playerHealth: number;
    onGameEnd: (payload: OnGameEndPayload) => void;
}

export const handlePlayerHealthZero = ({
    npcSummary,
    updatePlayerSummary,
    setContents,
    playerHealth,
    onGameEnd,
}: HandlePlayerHealthZeroProps) => {
    switch (npcSummary.name) {
        case 'Blue Dragon': {
            setContents(
                (dialogs.forest['npc-0'].afterFight.lost as NestedDialog)
                    .content as SetContentsPayload
            );
            break;
        }
        case 'Evil King': {
            setContents(
                (dialogs.evilKing['npc-1'].afterFight.lost as NestedDialog)
                    .content as SetContentsPayload
            );
            break;
        }
        case 'Evil Queen': {
            setContents(
                (dialogs.piscesTown['npc-3'].afterFight.lost as NestedDialog)
                    .content as SetContentsPayload
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
