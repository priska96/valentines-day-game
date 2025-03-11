import { DialogState } from '@/store/types';
import { forest, forest2 } from './dialogs/forest';
import { sky, skyBroken } from './dialogs/sky';
import { evilKing } from './dialogs/evilKing';
import { piscesTown, piscesTownMelted } from './dialogs/piscesTown';
import { underwater } from './dialogs/underwater';

interface DialogsInterface {
    forest: ForestDialog;
    forest2: ForestDialog;
    piscesTown: ForestDialog;
    piscesTownMelted: ForestDialog;
    sky: SkyDialog;
    skyBroken: SkyDialog;
    evilKing: EvilKingDialog;
    underwater: UnderwaterDialog;
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

export interface UnderwaterDialog {
    [npcKey: string]: DialogContentsInterface;
}

export interface DialogContentsInterface {
    [beforeAfterKey: string]: {
        [content: string]: DialogState | NestedDialog;
    };
}
export interface NestedDialog {
    content: DialogState | NestedDialog;
}

export const dialogs: DialogsInterface = {
    forest,
    forest2,
    piscesTown,
    piscesTownMelted,
    sky,
    skyBroken,
    evilKing,
    underwater,
};
