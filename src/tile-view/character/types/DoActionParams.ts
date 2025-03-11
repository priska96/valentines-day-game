import {
    Autotile,
    CharacterState,
    FireActionPayloadNPC,
    NPC,
    OnGameEndPayload,
    UpdateNPCPayload,
    UpdatePlayerPositionPayloadChar,
    ObjectNPC,
    SetContentsPayload,
} from '@/store/types';
import { GameModeEnum } from '@/store/enums';

export type DoActionParams = {
    map: string;
    character: CharacterState;
    npcs: NPC[];
    objectNPCs: ObjectNPC[];
    autotiles: Autotile[];
    winner: string | undefined;
    mode: GameModeEnum | undefined;
    setContents: (payload: SetContentsPayload) => void;
    fireActionNPC: (payload: FireActionPayloadNPC) => void;
    onGameEnd: (payload: OnGameEndPayload) => void;
    changeMap: (map: string) => void;
    updatePlayerPosition: (payload: UpdatePlayerPositionPayloadChar) => void;
    updateNPC: (payload: UpdateNPCPayload) => void;
    updateCharacterState: (updates: Partial<CharacterState>) => void;
};
