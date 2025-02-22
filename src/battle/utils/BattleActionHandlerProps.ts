import { CharSummary } from '@/tile-view/character/slices/characterSlice';
import { NPCSummary } from '@/tile-view/npc/slices/npcSlice';

export interface BattleActionHandlerProps {
    attacker: NPCSummary | CharSummary;
    receiver: NPCSummary | CharSummary;
    setInSequence: (value: React.SetStateAction<boolean>) => void;
    setAnnouncerMessage: React.Dispatch<React.SetStateAction<string>>;
    setPlayerAnimation: React.Dispatch<React.SetStateAction<string>>;
    setOpponentAnimation: React.Dispatch<React.SetStateAction<string>>;
    setOpponentHealth: React.Dispatch<React.SetStateAction<number>>;
    setPlayerHealth: React.Dispatch<React.SetStateAction<number>>;
    setTurn: React.Dispatch<React.SetStateAction<number>>;
    turn: number;
}
