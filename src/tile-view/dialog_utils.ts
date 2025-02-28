import { DialogState } from '@/game-ui/slices/dialogSlice';
import { forest, forest2 } from './dialogs/forest';
import { sky, skyBroken } from './dialogs/sky';
import { evilKing } from './dialogs/evilKing';
import { piscesTown, piscesTownMelted } from './dialogs/piscesTown';

interface DialogsInterface {
    forest: ForestDialog;
    forest2: ForestDialog;
    piscesTown: ForestDialog;
    piscesTownMelted: ForestDialog;
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
        content?: DialogState;
        beforeGear?: { content: DialogState };
        afterGear?: { content: DialogState };
        lost?: { content: DialogState };
        won?: { content: DialogState };
        goToSky?: { content: DialogState };
    };
}

export const dialogs: DialogsInterface = {
    forest,
    forest2,
    piscesTown,
    piscesTownMelted,
    sky,
    skyBroken,
    evilKing,
};
