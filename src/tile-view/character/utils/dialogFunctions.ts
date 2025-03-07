import { handleActionAfterDialogDone } from './finishAction';
import { FinishActionParams } from '../types/FinishActionParams';

export const continueDialog = ({
    dialog,
    character,
    setContents,
    onGameEnd,
    changeMap,
    updatePlayerPosition,
    updateNPC,
    updateObject,
    fireActionObject,
    addToInventory,
}: FinishActionParams) => {
    const openerId = dialog.openerId;
    const otherThingIdx = parseInt(openerId.split('-')[1]);

    handleActionAfterDialogDone({
        dialog,
        character,
        otherThingIdx,
        setContents,
        onGameEnd,
        changeMap,
        updatePlayerPosition,
        updateNPC,
        updateObject,
        fireActionObject,
        addToInventory,
    });
};
